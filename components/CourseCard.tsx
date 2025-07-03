/* -------------------------------------------------------------------------- */
/* components/CourseCard.tsx                                                  */
/* -------------------------------------------------------------------------- */

import Link from "next/link";
import Image from "next/image";
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/*                               Type definitions                             */
/* -------------------------------------------------------------------------- */

type MinimalCourse = {
  id: string | number;
  title: string;
  slug?: string;
  imageUrl: string;
  imageAlt: string;
  degreePrograms: string;
  duration: string;
  eligibility: string;
};

type Props =
  | {
      course: MinimalCourse; // full object
      link?: string;
    }
  | {
      course?: never; // pass raw fields instead of course object
      link: string;
      id: string | number;
      title: string;
      imageUrl: string;
      imageAlt: string;
      degreePrograms: string;
      duration: string;
      eligibility: string;
      slug?: string;
    };

/* -------------------------------------------------------------------------- */
/*                           Type-guard helper                                */
/* -------------------------------------------------------------------------- */

function isMinimalCourse(item: MinimalCourse | Omit<Props, "course">): item is MinimalCourse {
  return (
    typeof (item as MinimalCourse).imageUrl === "string" &&
    typeof (item as MinimalCourse).degreePrograms === "string"
  );
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

export default function CourseCard(props: Props) {
  /* --------------------- Normalize incoming data ------------------------ */
  const raw =
    "course" in props && props.course ? props.course : (props as Omit<Props, "course">);

  /* ------------------------ Optional type guard ------------------------- */
  const course = isMinimalCourse(raw) ? raw : undefined;

  /* --------------------------- Safe fields ------------------------------ */
  const imageUrl = course?.imageUrl ?? "/placeholder.jpg";
  const imageAlt = course?.imageAlt ?? course?.title ?? "Course image";

  const href =
    props.link ??
    (course?.slug ? `/courses/${course.slug}` : "#");

  const infoItems = course
    ? [
        {
          icon: AcademicCapIcon,
          label: "Available Degree Programs",
          value: course.degreePrograms,
        },
        { icon: CalendarDaysIcon, label: "Duration", value: course.duration },
        { icon: CheckBadgeIcon, label: "Eligibility", value: course.eligibility },
      ]
    : [];

  /* ----------------------------- Render --------------------------------- */
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight">
  {course?.title ??
    ("title" in raw ? raw.title : "Course")}
</h3>


        <div className="space-y-4 mb-6">
          {infoItems.map(({ icon: Icon, label, value }, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <Icon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-700">{label}</p>
                <p className="text-sm text-slate-600">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Link href={href} legacyBehavior>
            <a className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-colors duration-200 group">
              Know more
              <ArrowUpRightIcon className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
