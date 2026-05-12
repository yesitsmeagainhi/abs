import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import AdminLayout from '../../../components/admin/AdminLayout';

type Course = {
  slug: string;
  title: string;
  domain: string;
  tagline: string;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) return { redirect: { destination: '/admin/login', permanent: false } };
  return { props: {} };
};

export default function CoursesListPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/courses');
    if (res.ok) setCourses(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete course "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    const res = await fetch(`/api/admin/courses/${slug}`, { method: 'DELETE' });
    if (res.ok) setCourses((prev) => prev.filter((c) => c.slug !== slug));
    setDeleting(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Course
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No courses yet.</p>
          <Link href="/admin/courses/new" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Domain</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{course.title}</td>
                  <td className="px-4 py-3 text-gray-600">{course.domain || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{course.slug}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/${course.slug}`}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(course.slug)}
                        disabled={deleting === course.slug}
                        className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-50"
                      >
                        {deleting === course.slug ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
