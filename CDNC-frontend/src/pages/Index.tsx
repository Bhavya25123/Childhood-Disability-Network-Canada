import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Home/Hero";
import { NewsTicker } from "@/components/Home/NewsTicker";
import { ResourcesSection } from "@/components/Home/ResourcesSection";
import { AdvocacySection } from "@/components/Home/AdvocacySection";
import { CommunitySection } from "@/components/Home/CommunitySection";
import { ChatButton } from "@/components/Home/ChatButton";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <Header />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Hero />
        <ResourcesSection />
        <AdvocacySection />
      </motion.main>

      {/* <ChatButton /> */}
      <Footer />
    </>
  );
};

export default Index;
