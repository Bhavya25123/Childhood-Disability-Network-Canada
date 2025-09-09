import { PageLayout } from "../components/Layout/PageLayout";
import { HeroSlideshow } from "../components/Home/HeroSlideshow";
import { RunningBanner } from "../components/Home/RunningBanner";
import { AdvocacySection } from "../components/Home/AdvocacySection";
import { CommunitySection } from "../components/Home/CommunitySection";
import { ResourcesSection } from "../components/Home/ResourcesSection";

const Home = () => {
  const bannerItems = [
    "Join us in making a difference for children and families",
    "Support our mission to create positive change",
    "Together we can build a better future",
    "Your voice matters in shaping policies",
    "Connect with your community and make an impact"
  ];

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSlideshow />
        <div className="bg-purple-50 py-4">
          <RunningBanner items={bannerItems} speed={5} />
        </div>
        <AdvocacySection />
        <CommunitySection />
        <ResourcesSection />
      </div>
    </PageLayout>
  );
};

export default Home; 