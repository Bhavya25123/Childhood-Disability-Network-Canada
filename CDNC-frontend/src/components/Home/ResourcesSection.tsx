import {TiBook, TiBookmark } from "react-icons/ti";

interface ResourceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ResourceCard = ({
  icon,
  title,
  description,
  link,
}: ResourceCardProps) => (
  <div className="shadow-[0_1px_2px_rgba(0,0,0,0.05)] w-[395px] bg-white p-6 rounded-lg max-md:w-full">
    <i className={`${icon} text-blue-600 text-[26px] mb-4`} />
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-base text-gray-600 mb-4">{description}</p>
    <a
      href={link}
      className="text-base text-blue-600 no-underline hover:text-blue-700 transition-colors"
    >
      Learn More →
    </a>
  </div>
);

export const ResourcesSection = () => {
  return (
    <section className="bg-gray-50 px-20 py-16 max-sm:px-5 max-sm:py-10">
      
      <h2 className="text-3xl font-bold text-center mb-[45px] flex items-center justify-center gap-4">
              <TiBookmark className="text-purple-900 text-3xl" /> Essential Resources
            </h2>
      <div className="max-w-screen-xl flex gap-8 justify-center mx-auto my-0 max-md:flex-col max-md:items-center max-md:px-5 max-md:py-0">
        <ResourceCard
          icon="ti ti-file-text"
          title="Caregiving Guides"
          description="Access comprehensive guides and tutorials for caregiving basics."
          link="#"
        />
        <ResourceCard
          icon="ti ti-coins"
          title="Financial Support"
          description="Find information about grants, funding, and financial assistance."
          link="#"
        />
        <ResourceCard
          icon="ti ti-messages"
          title="Community Forum"
          description="Connect with other caregivers, share experiences, and get advice."
          link="#"
        />
      </div>
    </section>
  );
};
