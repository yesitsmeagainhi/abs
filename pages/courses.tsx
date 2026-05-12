/* pages/courses.tsx
   ------------------------------------------------------------
   Courses landing page – lists every MDX in /content/courses
   using the *front-matter* slug instead of the filename.
   ---------------------------------------------------------- */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { loadHeaderData } from '../lib/loadHeader';


type Course = {
  slug: string;
  title: string;
  heroImage: string;
  heroImageAlt?: string;
  degreePrograms?: string | null;
  duration?: string | null;
  eligibility?: string | null;
};

interface CoursesProps {
  courses: Course[];
  headerData: any;
}

const COURSES_DIR = path.join(process.cwd(), 'content/courses');

/* ---------- helper: derive slug safely ---------- */
const deriveSlug = (frontSlug: unknown, fileName: string) =>
  typeof frontSlug === 'string' && frontSlug.trim().length
    ? frontSlug.trim()
    : path.parse(fileName).name;

/* ---------- Server-side props ---------- */
export const getServerSideProps: GetServerSideProps = async () => {
  // util to load and parse all course files
  const loadCourses = async (): Promise<Course[]> => {
    const files = await fs.readdir(COURSES_DIR);

    return Promise.all(
      files
        .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
        .map(async (file) => {
          const raw = await fs.readFile(path.join(COURSES_DIR, file), 'utf8');
          const { data } = matter(raw);

          const slug = deriveSlug(data.slug, file);

          return {
            slug,
            title: data.title ?? slug,
            heroImage: data.heroImage ?? '/uploads/course-default.jpg',
            heroImageAlt: data.heroImageAlt ?? data.title,
            degreePrograms: data.degreePrograms ?? null,
            duration: data.duration ?? null,
            eligibility: data.eligibility ?? null,
          } as Course;
        }),
    ).then((arr) => arr.sort((a, b) => a.title.localeCompare(b.title)));
  };

  try {
    const [headerData, courses] = await Promise.all([
      loadHeaderData(),
      loadCourses(),
    ]);

    return { props: { courses, headerData } };
  } catch (err) {
    console.error('Error loading header or courses:', err);
    // Fallback: still try to show courses even if header fails
    try {
      const courses = await loadCourses();
      return { props: { courses, headerData: null } };
    } catch {
      return { props: { courses: [], headerData: null } };
    }
  }
};

/* ---------- Page component ---------- */
export default function CoursesPage({ courses }: CoursesProps) {
  return (
    <>
      <Head>
        <title>Courses | ABS Educational Solution</title>
        <meta
          name="description"
          content="Explore every diploma, degree and paramedical programme offered by ABS Educational Solution."
        />
      </Head>

      <main className="bg-slate-50 min-h-screen py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-14 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Explore Our Programs
            </h1>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Find the perfect course to kick-start your career in pharmacy,
              nursing & allied health.
            </p>
          </header>

          {/* CTA strip */}
          <div className="mb-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Confused which course is right for you?
            </h2>
            <p className="text-emerald-50 text-sm sm:text-base mb-5">
              Talk to an ABS counsellor — free guidance on admissions, fees, scholarships, and career outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+919702836946"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-5 py-2.5 rounded-lg shadow hover:shadow-md transition"
              >
                📞 Call +91 97028 36946
              </a>
              <a
                href="https://wa.me/919702836946?text=Hi%20ABS%2C%20I%20want%20guidance%20on%20choosing%20the%20right%20course."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:shadow-md transition"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {courses.length === 0 ? (
            <p className="text-center text-slate-500">
              No courses found. Add a new file in{' '}
              <strong>content/courses/</strong>.
            </p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <li
                  key={c.slug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/courses/${c.slug}`} className="block group">
                    <div className="relative w-full h-48">
                      <Image
                        src={c.heroImage}
                        alt={c.heroImageAlt ?? c.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-2 text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {c.title}
                      </h2>

                      <dl className="text-sm text-slate-600 space-y-1">
                        {c.degreePrograms && (
                          <div>
                            <dt className="font-medium inline text-slate-700">
                              Degree:{' '}
                            </dt>
                            <dd className="inline">{c.degreePrograms}</dd>
                          </div>
                        )}
                        {c.duration && (
                          <div>
                            <dt className="font-medium inline text-slate-700">
                              Duration:{' '}
                            </dt>
                            <dd className="inline">{c.duration}</dd>
                          </div>
                        )}
                        {c.eligibility && (
                          <div>
                            <dt className="font-medium inline text-slate-700">
                              Eligibility:{' '}
                            </dt>
                            <dd className="inline">{c.eligibility}</dd>
                          </div>
                        )}
                      </dl>

                      <span className="inline-block mt-4 text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300">
                        View details →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
