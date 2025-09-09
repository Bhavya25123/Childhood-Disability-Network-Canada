import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SkipLink } from "../Common/SkipLink";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 