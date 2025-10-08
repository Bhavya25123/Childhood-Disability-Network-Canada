import { TiBookmark, TiBook } from "react-icons/ti";
import { FiDollarSign, FiUsers } from "react-icons/fi";
import { ReactNode } from "react";

interface ResourceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

const ResourceCard = ({ icon, title, description, link }: ResourceCardProps) => (
  <div
    className="group relative w-[360px] max-md:w-full"
  >
    <a
      href={link}
      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white/90 p-6 backdrop-blur-sm outline-none
                 shadow-sm transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl
                 focus-visible:ring-2 focus-visible:ring-blue-500/60"
      aria-label={`${title} – Learn more`}
    >
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg
                   bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600
                   ring-1 ring-inset ring-blue-200 group-hover:from-blue-100 group-hover:to-indigo-200
                   transition-colors"
      >
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
        {description}
      </p>
      <span
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-blue-600
                   transition-colors group-hover:text-blue-700"
      >
        Learn More
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-inset ring-blue-400/50
                   group-hover:opacity-100 transition-opacity"
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0
                   bg-[linear-gradient(120deg,rgba(56,132,255,0.15),rgba(139,92,246,0.15))]
                   group-hover:opacity-100 transition-opacity"
      />
    </a>
  </div>
);

export const ResourcesSection = () => {
  return (
    <section className="relative overflow-hidden px-8 py-24 max-md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#eef2ff,transparent_60%),radial-gradient(circle_at_80%_70%,#f3e8ff,transparent_55%)]" />
      <div className="mx-auto max-w-6xl relative">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
          <h2 className="relative flex items-center gap-3 text-3xl font-bold tracking-tight text-gray-900 max-sm:text-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-900 shadow-inner">
              <TiBookmark className="text-2xl" />
            </span>
            <span className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent">
              Essential Resources
            </span>
          </h2>
          <p className="mt-5 text-base text-gray-600">
            Curated tools and guidance to support caregivers and families.
          </p>
        </div>

        <div
          className="grid gap-10 md:grid-cols-3 max-md:gap-8"
        >
          <ResourceCard
            icon={<TiBook className="text-2xl" />}
            title="Caregiving Guides"
            description="Step-by-step guides, checklists, and foundational knowledge to help you feel confident."
            link="/resources#caregiving"
          />
          <ResourceCard
            icon={<FiDollarSign className="text-2xl" />}
            title="Financial Support"
            description="Explore grants, tax credits, subsidies, and structured financial planning help."
            link="/resources#financial"
          />
            <ResourceCard
            icon={<FiUsers className="text-2xl" />}
            title="Community Forum"
            description="Exchange experiences, find peer support, and build your caregiver network."
            link="/resources#community"
          />
        </div>
      </div>
    </section>
  );
};
