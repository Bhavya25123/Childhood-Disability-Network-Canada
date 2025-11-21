import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Link, Search, Grid, List, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KnowledgeHub from "@/components/faqs";

const Resources = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("guides");

  useEffect(() => {
    // Extract fragment from URL (remove the # character)
    const fragment = location.hash.replace("#", "");
    
    // Set active tab based on fragment if it exists and corresponds to a valid tab
    if (fragment && ["guides", "caregiving", "financial", "community"].includes(fragment)) {
      // Map "caregiving" to "guides" if needed (since ResourcesSection uses #caregiving but tab is "guides")
      const tabValue = fragment === "caregiving" ? "guides" : fragment;
      setActiveTab(tabValue);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Government Funding and Support</h1>
            <p className=" md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Child Disability Tax Credit, OAP, Other provincial fundings, National and Provincial/Territoral Links
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center border-2 rounded-lg bg-transparent overflow-hidden">
                <Search className="ml-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full px-4 py-3 outline-none"
                />
                <Button className="m-1 bg-purple-900 text-white hover:bg-purple-dark" onClick={() => {
                  const searchInput = document.querySelector('input[placeholder="Search resources..."]') as HTMLInputElement;
                  const searchTerm = searchInput?.value.toLowerCase();
                  
                  if (searchTerm) {
                  // Get all resource cards
                  const resourceCards = document.querySelectorAll('.hover\\:shadow-md');
                  
                  // Filter resources based on search term
                  resourceCards.forEach((card) => {
                    const cardTitle = card.querySelector('.text-xl')?.textContent?.toLowerCase() || '';
                    const cardDescription = card.querySelector('.text-base')?.textContent?.toLowerCase() || '';
                    const cardCategory = card.querySelector('.text-sm')?.textContent?.toLowerCase() || '';
                    
                    const matches = cardTitle.includes(searchTerm) || 
                           cardDescription.includes(searchTerm) || 
                           cardCategory.includes(searchTerm);
                    
                    // Show/hide cards based on search results
                    (card as HTMLElement).style.display = matches ? 'block' : 'none';
                  });
                  }
                }}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className=" px-4">
          <div className="max-w-screen-xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-2 border-b">
                <TabsList className="bg-transparent mb-[-1px]">
                  <TabsTrigger value="guides" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none">
                    <Book className="mr-2 h-4 w-4" />
                    Caregiving Guides
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none">
                    <FileText className="mr-2 h-4 w-4" />
                    Financial Support
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none">
                    <Link className="mr-2 h-4 w-4" />
                    Community Resources
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="guides" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="col-span-full mb-1 bg-purple-light/20 px-0 py-3 mt-3 rounded-lg">
                    <h2 className="text-2xl font-bold text-purple-900 mb-3">Caregiving Guides</h2>
                    <h4 className="text-l font-semibold text-purple-900 mb-3">Access comprehensive 
                      guides and tutorials for caregiving basics.
                    </h4>
                    <p className="text-gray-700">
                      
                      Caregiving isn't just a role—it's a learning curve. 
                      Whether you're a parent navigating your child's new diagnosis, 
                      a grandparent stepping into daily care, or a sibling helping from a 
                      distance, these essential tools can empower you with confidence and clarity.
                    </p>
                    <div className="flex items-start mt-4">
                      <p className="text-sm italic text-gray-600">
                        < span className="font-semibold text-purple-900">Caregiving Tip: </span> 
                        You're not just a "helper"—you're part of the care team. 
                        These resources give you the confidence to speak up, ask questions, and advocate effectively.
                      </p>
                    </div>
                  </div>
                  <ResourceCard 
                    title="Caregiving Essentials Program (McMaster University)" 
                    category="Guide"
                    description="A free, online, self-paced course tailored to 
                    Canadian caregivers. It covers safety, communication, healthcare navigation, and mental health."
                    linkText="Learn More"
                    linkUrl="https://continuing.mcmaster.ca/programs/
                      health-social-services/caregiving-essentials/
                      ?utm_source=chatgpt.com"
                    
                  />
                  <ResourceCard 
                    title="CareChannel by Elizz (SE Health)" 
                    category="Self-Care"
                    description="Hundreds of short, accessible videos covering daily
                     caregiving needs—like managing medications, supporting mobility, dementia care, or stress reduction."
                    linkText="Learn More"
                    linkUrl="https://carechannel.elizz.com/?utm_source=chatgpt.com"
                  />
                  <ResourceCard 
                    title="CareMakers Foundation" 
                    category="Guide"
                    description="Offers guides, digital toolkits, and connections 
                    to local training and support organizations across provinces."
                    linkText="Learn More"
                    linkUrl="https://caremakers.ca/caregivers/?utm_source=chatgpt.com"
                  />
                  <ResourceCard 
                    title="Ontario Caregiver Organization" 
                    category="Checklist"
                    description="Learn how to be recognized as an Essential Care Partner and get involved in your loved one’s healthcare planning."
                    linkText="Learn More"
                    linkUrl="https://ontariocaregiver.ca/
                      essential-care-partner/overview/?utm_source=chatgpt.com"
                  />
                </div>
              </TabsContent>

              <TabsContent value="financial" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="col-span-full mb-1 bg-purple-light/20 px-0 py-3 mt-3 rounded-lg">
                    <h2 className="text-2xl font-bold text-purple-900 mb-3">Financial Support</h2>
                    <h4 className="text-l font-semibold text-purple-900 mb-3">Find grants, subsidies, 
                      tax credits, and income relief programs to reduce your caregiving burden.
                    </h4>
                    <p className="text-gray-700">
                      The financial cost of caregiving can add up
                       quickly lost work hours, travel to appointments, 
                       medications, home modifications. But there are real programs designed to help.
                    </p>
                    <div className="flex items-start mt-4">
                      <p className="text-sm italic text-gray-600">
                        < span className="font-semibold text-purple-900">Caregiving Insight: </span> 
                        Many families qualify for benefits but don’t apply because 
                        they don’t know they exist. Let’s change that.
                      </p>
                    </div>
                  </div>
                  <ResourceCard 
                    title="Caregiver Recognition Benefit – Veterans Affairs Canada" 
                    category="Financial"
                    description="Monthly, tax-free payments for caregivers of eligible veterans."
                    linkText="Learn More"
                    linkUrl="https://www.veterans.gc.ca/en"
                  />
                  <ResourceCard 
                    title="Family Caregivers of BC – Financial Assistance Guide 2025" 
                    category="Financial"
                    description="Details on medical expense deductions, grants for equipment, and provincial supports."
                    linkText="Learn More"
                    linkUrl="https://www.familycaregiversbc.ca/archives/20061?utm_source=chatgpt.com"
                  />
                  <ResourceCard 
                    title="Federal and Provincial Programs (Canada.ca)" 
                    category="Guide"
                    description="healthcare costs while maintaining quality care."
                    linkText="Read Guide"
                    linkUrl="https://www.canada.ca/en/services/benefits/family.html"
                  />
                   <ResourceCard 
                    title="Child Disability Benefit (CDB) – Canada Revenue Agency" 
                    category="Financial" 
                    description="A tax-free monthly payment to help families care for a child under 18 with a severe and prolonged disability." 
                    linkText="Apply Now" 
                    linkUrl="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/child-disability-benefit.html" 
                  />
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="col-span-full mb-1 bg-purple-light/20 px-0 py-3 mt-3 rounded-lg">
                    <h2 className="text-2xl font-bold text-purple-900 mb-3">Community Resources</h2>
                    <h4 className="text-l font-semibold text-purple-900 mb-3">Share your journey. 
                      Find your people. Get real answers from those who’ve been there.
                    </h4>
                    <p className="text-gray-700">
                      Caregiving can feel isolating—but it doesn’t have to be.
                       Our community forum is a space where caregivers, especially
                        those raising children with disabilities, can connect, learn, 
                        and support each other.
                    </p>
                    <div className="flex items-start mt-4">
                      <p className="text-sm italic text-gray-600"> 
                        You are not alone. There are others just like you—waiting to welcome you, listen to you, and support you.
                      </p>
                    </div>
                  </div>
                  <ResourceCard 
                    title="Canadian Centre for Caregiving Excellence (CCCE)" 
                    category="Community"
                    description="Join advocacy groups, caregiver mentorship 
                      programs, and participate in national initiatives."
                    linkText="Learn More"
                    linkUrl="https://canadiancaregiving.org/
                    impact/support-networks-and-knowledge-sharing/
                    ?utm_source=chatgpt.com"
                  />
                  <ResourceCard 
                    title="Careers Canada" 
                    category="Community"
                    description="Find caregiver coalitions, webinars, 
                      and community roundtables across Canada."
                    linkText="Learn More"
                    linkUrl="https://www.tevapharm.com/our-company/"
                  />
                  <ResourceCard 
                    title="VON Caregiver Supports" 
                    category="Service"
                    description="Access peer groups, one-on-one counselling, 
                      and local connections for emotional support."
                    linkText="Learn More"
                    linkUrl="https://von.ca/en/von-care/caregiver-supports?utm_source=chatgpt.com"
                  />
                  <ResourceCard 
                    title="BC Complex Kids Society" 
                    category="Education"
                    description="The BC Complex Kids Society is a non-profit organization 
                      with a voice for children and youth with medical complexity and
                       to help shift their experience from surviving to thriving."
                    linkText="Learn More"
                    linkUrl="https://www.bccomplexkids.ca/advocacy?f
                      bclid=IwZXh0bgNhZW0CMTEAAR2LHztrkSz7BzcC1bmbVtUnEkTEqTa
                      0B5A5iqB8PtMm56DZwLiGQjAazjk_aem_x0tk5i2iae3dgZBYLH-ejA"
                  />
                  <ResourceCard 
                    title="Results Org" 
                    category="Community"
                    description="A passionate network of advocates in every state and Washington, DC."
                    linkText="Find Help"
                    linkUrl="https://results.org"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured Resource */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-purple-light p-8 flex items-center justify-center">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">A Guide for Caregivers by Tanya Radford</h3>
                    <p className="text-gray-700 mb-6">
                      A Canada-wide handbook offering practical advice, 
                      emotional support strategies, and navigation tips 
                      for caregivers, with sections on health management, 
                      communication, and links to national resources.
                    </p>
                    <Button className="bg-purple-900 text-white hover:bg-purple-dark" onClick={() => {
                      // Trigger file download
                      const link = document.createElement('a');
                      link.target = "_blank";
                      link.href = 'https://mscanada.ca/sites/default/files/documents/2024-09/1-original_2.pdf?utm_source=chatgpt.com'; // Ensure this path is correct
                      link.download = 'Caregivers_Comprehensive_Handbook.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>
                      Download Free PDF
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h4 className="text-xl font-semibold mb-4">What's Inside:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-1 mt-0.5">1.</div>
                      <span>Step-by-step guides for new caregivers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-1 mt-0.5">2.</div>
                      <span>Understanding the caregiver role and managing daily responsibilities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-1 mt-0.5">3.</div>
                      <span>Strategies for balancing physical health, nutrition, and mobility needs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-1 mt-0.5">4.</div>
                      <span>Emotional support and communication tips for caregivers and families</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-1 mt-0.5">5.</div>
                      <span>Self-care practices and burnout prevention techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-purple-light">
          <KnowledgeHub />
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  category: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const ResourceCard = ({ title, category, description, linkText, linkUrl }: ResourceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="text-sm font-medium text-purple-900 mb-1">{category}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-base">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <a 
          href={linkUrl} 
          target="_blank"
          className="text-purple-900 hover:text-purple-900 font-medium flex items-center"
        >
          {linkText}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </a>
      </CardFooter>
    </Card>
  );
};

export default Resources;
