import { TiArrowUp, TiMessages } from "react-icons/ti";

interface CommunityPostProps {
  profileImage: string;
  title: string;
  author: string;
  excerpt: string;
  upvotes: number;
  comments: number;
}

const CommunityPost = ({
  profileImage,
  title,
  author,
  excerpt,
  upvotes,
  comments,
}: CommunityPostProps) => (
  <div className="shadow-[0_1px_2px_rgba(0,0,0,0.05)] w-[608px] flex gap-7 bg-white p-6 rounded-lg max-md:w-full">
    <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
    <div>
      <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
        <TiArrowUp className="text-purple-900 text-lg" />
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
        <TiMessages className="text-purple-900 text-lg" /> Posted by {author}
      </p>
      <p className="text-base text-gray-700 mb-9">{excerpt}</p>
      <div className="flex gap-4">
        <div className="flex items-center gap-1 text-gray-500 text-base">
          <TiArrowUp className="text-gray-600 text-lg" />
          <span>{upvotes}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-base">
          <TiMessages className="text-gray-600 text-lg" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  </div>
);

export const CommunitySection = () => {
  return (
    <section className="bg-gray-50 px-20 py-16 max-sm:px-5 max-sm:py-10">
      <h2 className="text-3xl font-bold text-center mb-[45px] flex items-center justify-center gap-4">
        <TiMessages className="text-purple-900 text-3xl" /> Community Highlights
      </h2>
      <div className="max-w-screen-xl flex gap-8 justify-center mx-auto my-0 max-md:flex-col max-md:items-center max-md:px-5 max-md:py-0">
        <CommunityPost
          profileImage="https://cdn.builder.io/api/v1/image/assets/TEMP/95658e1b1c8a2e38d08fd95a6f5d1ef88469b41c"
          title="Tips for Managing Stress"
          author="Sarah M."
          excerpt="Sharing my experience and strategies for managing caregiver burnout..."
          upvotes={24}
          comments={12}
        />
        <CommunityPost
          profileImage="https://cdn.builder.io/api/v1/image/assets/TEMP/bea45c5ed526c3475e64b57870ca9970ed123459"
          title="Financial Resources Guide"
          author="John D."
          excerpt="Compiled a list of available grants and financial support programs..."
          upvotes={18}
          comments={8}
        />
      </div>
    </section>
  );
};
