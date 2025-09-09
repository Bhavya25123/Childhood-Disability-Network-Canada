import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import { Testimonials } from "../components/Home/Testimonials";
import { CallToAction } from "../components/Home/CallToAction";
import { Stats } from "../components/Home/Stats";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import { Helmet } from "react-helmet-async";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Caregiver Support Network - Home</title>
        <meta name="description" content="Supporting caregivers with community, resources, and advocacy." />
      </Helmet>
      
      <Header />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}; 