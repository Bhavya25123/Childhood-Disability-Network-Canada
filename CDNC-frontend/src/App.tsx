
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindSupport from "./pages/FindSupport";
import JoinCommunity from "./pages/JoinCommunity";
import SendLetter from "./pages/SendLetter";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FindMP from "./pages/FindMP";
import AdvocacyHub from "./pages/AdvocacyHub";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-support" element={<FindSupport />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/send-letter" element={<SendLetter />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/find-mp" element={<FindMP />} />
          <Route path="/advocacy" element={<AdvocacyHub />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
