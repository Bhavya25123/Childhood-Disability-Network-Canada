import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Link, Search, Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Resources = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("national");

  useEffect(() => {
    // Extract fragment from URL (remove the # character)
    const fragment = location.hash.replace("#", "");
    
    // Set active tab based on fragment if it exists and corresponds to a valid tab
    if (fragment && ["national","guides", "caregiving", "financial", "community", "provincial"].includes(fragment)) {
      // Map "caregiving" to "guides" if needed (since ResourcesSection uses #caregiving but tab is "guides")
      const tabValue = fragment === "caregiving" ? "guides" : fragment;
      setActiveTab(tabValue);
    }
  }, [location]);

  useEffect(() => {
    // Scroll behavior: if a hash exists, scroll that element into view; else scroll to top
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section id="top" className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Government Funding and Support</h1>
            <p className=" md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access comprehensive guides, financial assistance information, and community support to help you navigate your caregiving journey.
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
        <section className=" px-4 mb-10">
          <div className="max-w-screen-xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-2 border-b overflow-x-auto">
                <TabsList className="bg-transparent mb-[-1px] flex-nowrap inline-flex w-full min-w-max md:w-auto">
                  <TabsTrigger value="national" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none whitespace-nowrap text-xs md:text-sm flex-shrink-0">
                    <Globe className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">National Resources</span>
                    <span className="sm:hidden">National</span>
                  </TabsTrigger>
                  <TabsTrigger value="provincial" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none whitespace-nowrap text-xs md:text-sm flex-shrink-0">
                    <MapPin className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Provincial Resources</span>
                    <span className="sm:hidden">Provincial</span>
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none whitespace-nowrap text-xs md:text-sm flex-shrink-0">
                    <Book className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Caregiving Guides</span>
                    <span className="sm:hidden">Guides</span>
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none whitespace-nowrap text-xs md:text-sm flex-shrink-0">
                    <FileText className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Financial Support</span>
                    <span className="sm:hidden">Financial</span>
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:border-b-2 data-[state=active]:border-purple rounded-none whitespace-nowrap text-xs md:text-sm flex-shrink-0">
                    <Link className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Community Resources</span>
                    <span className="sm:hidden">Community</span>
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
                {/* Featured Resource */}
                    <div className="max-w-screen-xl mx-auto mt-10 mb-10">
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

              <TabsContent value="national" className="mt-0">
                <NationalResources />
              </TabsContent>
              <TabsContent value="provincial" className="mt-0">
                <ProvincialResources />
              </TabsContent>
            </Tabs>
          </div>
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

// National Resources component data extracted from user request
interface SimpleLinkGroup {
  heading: string;
  links: { label: string; url: string }[];
}

const nationalLinkGroups: SimpleLinkGroup[] = [
  {
    heading: "Government Benefits",
    links: [
      { label: "Child Disability Benefit", url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/child-disability-benefit.html" },
      { label: "Disability Tax Credit", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html" },
    ],
  },
  {
    heading: "Advocacy Agencies",
    links: [
      { label: "Canadian Centre of Caregiving Excellence", url: "https://canadiancaregiving.org/" },
      { label: "Every Canadian Counts", url: "https://everycanadiancounts.com/" },
      { label: "Disability Without Poverty", url: "https://www.disabilitywithoutpoverty.ca/en" },
      { label: "Accessible Housing Network Canada", url: "https://www.accessiblehousingnetwork.org/" },
      { label: "Campaign 2000", url: "https://campaign2000.ca/" },
      { label: "Council of Canadians with Disabilities", url: "http://www.ccdonline.ca/en/about" },
      { label: "Canadian Child Welfare Portal", url: "https://cwrp.ca/disability" },
      { label: "Rick Hansen Foundation", url: "https://www.rickhansen.com/about-us/national-disability-initiative" },
      { label: "Young Caregivers", url: "https://youngcaregivers.ca/" },
      { label: "Partner for Planning", url: "https://www.planningnetwork.ca/" },
      { label: "Prosper Canada", url: "https://prospercanada.org/" },
    ],
  },
  {
    heading: "Disability Support & Research",
    links: [
      { label: "Canadian Organization for Rare Diseases", url: "https://www.raredisorders.ca/" },
      { label: "Canadian Down Syndrome Association", url: "https://cdss.ca/" },
      { label: "Autism Canada", url: "https://www.autismcanada.org/" },
      { label: "Cerebral Palsy Canada Network", url: "https://www.cpcanadanetwork.com/" },
      { label: "Inclusion Canada", url: "https://www.inclusioncanada.ca/" },
      { label: "Learning Disabilities Canada", url: "https://www.ldac-acta.ca/" },
      { label: "CanChild", url: "https://canchild.ca/" },
      { label: "Communication Disabilities Across Canada", url: "https://www.cdacanada.com/" },
      { label: "National Educational Association of Disabled Students", url: "https://www.neads.ca/en/" },
      { label: "Canadian Child Welfare Portal", url: "https://cwrp.ca/disability" },
      { label: "Easter Seals Canada - Programs & Services", url: "https://easterseals.ca/en/about-us/programs-and-services/" },
      { label: "March of Dimes", url: "https://www.marchofdimes.ca/en-ca" },
      { label: "Smile Canada", url: "https://www.smilecan.org/" },
      { label: "CNIB", url: "https://www.cnib.ca/en" },
      { label: "Silent Voice Canada", url: "https://silentvoice.ca/" },
    ],
  },
  {
    heading: "Grants & Wish Programs",
    links: [
      { label: "Make a Wish Canada", url: "https://makeawish.ca/" },
      { label: "Shine Foundation", url: "https://www.shinefoundation.ca/" },
      { label: "Petro Canada CareMakers Foundation", url: "https://caremakers.ca/" },
      { label: "Treat Accessibly", url: "https://www.treataccessibly.com" },
      { label: "The Isaac Foundation", url: "https://www.theisaacfoundation.com" },
    ],
  },
];

function NationalResources() {
  return (
    <div className="mt-2">
      <div className="col-span-full mb-1 bg-purple-light/20 px-0 py-3 mt-3 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-3">National Resources</h2>
        <p className="text-gray-700 mb-2">Centralized links to nationwide benefits, advocacy organizations, research bodies, and grant programs.</p>
        <p className="text-sm italic text-gray-600">Use these trusted sources to explore funding, connect to support networks, and amplify advocacy impact.</p>
      </div>
      <div className="space-y-8">
        {nationalLinkGroups.map(group => (
          <div key={group.heading}>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">{group.heading}</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {group.links.map(link => (
                <li key={link.url} className="group">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-md border border-gray-200 hover:border-purple-400 hover:bg-purple-light/10 transition-colors text-sm text-gray-700">
                    <span className="flex-1">{link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Provincial Resources component data extracted from user request
interface ProvinceGroup {
  province: string;
  links: { label: string; url: string; note?: string }[];
}

const provincialGroups: ProvinceGroup[] = [
  {
    province: "British Columbia",
    links: [
      { label: "Family Caregivers BC", url: "https://www.familycaregiversbc.ca" },
      { label: "BC Complex Kids Society", url: "https://www.bccomplexkids.ca/" },
      { label: "Inclusion BC", url: "https://inclusionbc.org/" },
    ],
  },
  {
    province: "Alberta",
    links: [
      { label: "Caregiver Alberta", url: "https://www.caregiversalberta.ca/" },
      { label: "Inclusion Alberta (Advocacy)", url: "https://inclusionalberta.org/what-we-do/individual-family-advocacy/" },
    ],
  },
  {
    province: "Manitoba",
    links: [
      { label: "Inclusion Manitoba", url: "https://www.aclmb.ca/" },
      { label: "Government of Manitoba - Persons with Disabilities", url: "https://www.gov.mb.ca/fs/pwd/index.html" },
      { label: "Children's disABILITY Services (Manitoba)", url: "https://www.gov.mb.ca/fs/cds/index.html" },
    ],
  },
  {
    province: "Ontario",
    links: [
      { label: "Ontario Disability Coalition", url: "https://odcoalition.com/" },
      { label: "Ontario Caregiver Coalition", url: "https://www.ontariocaregivercoalition.ca/" },
      { label: "Ontario Caregiver Organization", url: "https://ontariocaregiver.ca/" },
      { label: "Disability Justice Network Ontario", url: "https://www.djno.ca/" },
      { label: "AODA Alliance", url: "https://www.aodaalliance.org/" },
      { label: "Physicians of Ontario Neurodevelopmental Advocacy (PONDA)", url: "https://ponda.ca/" },
      { label: "Ontario Autism Coalition", url: "https://ontarioautismcoalition.com/" },
      { label: "Family Alliance Ontario", url: "https://family-alliance.com/" },
    ],
  },
  {
    province: "Quebec",
    links: [
      { label: "L’APPUI (Proches aidants)", url: "https://www.lappui.org/fr/", note: "Support for caregivers of older adults" },
      { label: "Quebec Society for Intellectual Disabilities (SQDI)", url: "https://www.sqdi.ca/en/" },
    ],
  },
  {
    province: "New Brunswick",
    links: [
      { label: "New Brunswick Disability Coalition", url: "https://www.nbcpd.org/" },
      { label: "Caregiver NB", url: "https://www.caregiversnb.org/" },
      { label: "Inclusion New Brunswick", url: "https://www.inclusionnb.ca/" },
    ],
  },
  {
    province: "Nova Scotia",
    links: [
      { label: "Caregivers Nova Scotia", url: "https://caregiversns.org/" },
      { label: "Disability Rights Coalition NS", url: "https://www.disabilityrightscoalitionns.ca/" },
      { label: "Inclusion Nova Scotia", url: "https://www.inclusionnb.ca/" },
    ],
  },
  {
    province: "Prince Edward Island",
    links: [
      { label: "Hospice PEI – Caregiver Support", url: "https://hospicepei.ca/caregiver-support-resources/" },
      { label: "At-Home Caregiver Benefit (PEI)", url: "https://www.princeedwardisland.ca/en/information/health-and-wellness/at-home-caregiver-benefit" },
      { label: "PEI Association for Community Living", url: "https://peiacl.org/" },
    ],
  },
  {
    province: "Newfoundland & Labrador",
    links: [
      { label: "Coalition of Persons with Disabilities NL (COD NL)", url: "https://codnl.ca/" },
      { label: "Inclusion Canada Newfoundland (Respite Program)", url: "https://www.inclusioncanadanl.ca/hotel-respite-program" },
      { label: "Caregivers Report (Citizens Rep Office)", url: "https://www.citizensrep.nl.ca/pdfs/CaregiversReportOct5-2023.pdf" },
    ],
  },
  {
    province: "Nunavut",
    links: [
      { label: "Nunavummi Disabilities Makinnasuaqtiit Society (Nuability)", url: "https://nuability.ca/" },
      { label: "Arctic Child and Youth Foundation", url: "https://acyf.ca/" },
    ],
  },
  {
    province: "Northwest Territories",
    links: [
      { label: "NWT Disability Council", url: "https://www.nwtdc.net/" },
      { label: "True North Aid", url: "https://truenorthaid.ca/" },
      { label: "Inclusion NWT", url: "https://www.inclusionnwt.ca/" },
    ],
  },
  {
    province: "Yukon",
    links: [
      { label: "Inclusion Yukon", url: "https://www.inclusionyukon.org/" },
    ],
  },
];

function ProvincialResources() {
  return (
    <div className="mt-2">
      <div className="col-span-full mb-1 bg-purple-light/20 px-0 py-3 mt-3 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-3">Provincial Resources</h2>
        <p className="text-gray-700 mb-2">Explore province-specific caregiver support organizations, advocacy groups, and government program portals.</p>
        <p className="text-sm italic text-gray-600">Access localized help that understands your regional systems and services.</p>
      </div>
      <div className="space-y-10">
        {provincialGroups.map(group => (
          <div key={group.province}>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">{group.province}</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {group.links.map(link => (
                <li key={link.url} className="group">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-md border border-gray-200 hover:border-purple-400 hover:bg-purple-light/10 transition-colors text-sm text-gray-700"
                  >
                    <span className="flex-1">{link.label}</span>
                    {link.note ? (
                      <span className="ml-2 text-xs text-gray-500 italic">{link.note}</span>
                    ) : null}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-purple-600 ml-2 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
