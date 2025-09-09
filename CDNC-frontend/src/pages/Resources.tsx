import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Link, Search, Grid, List } from "lucide-react";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Caregiver Resources</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access comprehensive guides, financial assistance information, and community support to help you navigate your caregiving journey.
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center border-2 rounded-lg bg-white overflow-hidden">
                <Search className="ml-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full px-4 py-3 outline-none"
                />
                <Button className="m-1 bg-purple hover:bg-purple-dark">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-screen-xl mx-auto">
            <Tabs defaultValue="guides" className="w-full">
              <div className="flex justify-between items-center mb-8 border-b">
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
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-200">
                    <List className="mr-2 h-4 w-4" />
                    List
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200">
                    <Grid className="mr-2 h-4 w-4" />
                    Grid
                  </Button>
                </div>
              </div>

              <TabsContent value="guides" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard 
                    title="New Caregiver Orientation" 
                    category="Guide"
                    description="Essential steps and information for those new to caregiving responsibilities."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Medication Management" 
                    category="Guide"
                    description="Learn effective strategies for managing medications, avoiding errors, and creating reminder systems."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Preventing Caregiver Burnout" 
                    category="Self-Care"
                    description="Recognize the signs of burnout and implement strategies to maintain your wellbeing while caregiving."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Home Safety Assessment" 
                    category="Checklist"
                    description="Comprehensive checklist to ensure your home is safe and accessible for the person you're caring for."
                    linkText="Download Checklist"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Communication Techniques" 
                    category="Guide"
                    description="Effective communication strategies for caregivers dealing with various conditions and challenges."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Mobility Assistance" 
                    category="Training"
                    description="Learn proper techniques for helping with mobility to prevent injury to yourself and the care recipient."
                    linkText="Watch Video"
                    linkUrl="#"
                  />
                </div>
              </TabsContent>

              <TabsContent value="financial" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard 
                    title="Caregiver Tax Credits" 
                    category="Financial"
                    description="Information on available tax credits and deductions for family caregivers in various jurisdictions."
                    linkText="Learn More"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Government Assistance Programs" 
                    category="Financial"
                    description="Overview of federal, state, and local financial assistance programs available to caregivers."
                    linkText="Check Eligibility"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Healthcare Cost Management" 
                    category="Guide"
                    description="Strategies for managing and reducing healthcare costs while maintaining quality care."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Paid Family Leave Options" 
                    category="Financial"
                    description="Information on paid family leave policies and how to apply for benefits in your region."
                    linkText="Check Availability"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Respite Care Funding" 
                    category="Financial"
                    description="Sources of funding for respite care services to provide caregivers with necessary breaks."
                    linkText="Find Programs"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Financial Planning for Caregivers" 
                    category="Guide"
                    description="Long-term financial planning considerations for those in caregiving roles."
                    linkText="Read Guide"
                    linkUrl="#"
                  />
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard 
                    title="Local Support Groups" 
                    category="Community"
                    description="Find caregiver support groups in your area for in-person connection and shared experiences."
                    linkText="Find Groups"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Online Forums & Communities" 
                    category="Community"
                    description="Join online caregiver communities for 24/7 support, advice, and connection with others."
                    linkText="Join Forums"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Respite Care Services" 
                    category="Service"
                    description="Directory of respite care providers to give caregivers necessary breaks from caregiving duties."
                    linkText="Find Services"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Caregiver Training Workshops" 
                    category="Education"
                    description="Schedule of upcoming workshops and training sessions for caregivers in your region."
                    linkText="View Schedule"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Volunteer Assistance" 
                    category="Community"
                    description="Connect with volunteer organizations that provide assistance to caregivers and care recipients."
                    linkText="Find Help"
                    linkUrl="#"
                  />
                  <ResourceCard 
                    title="Transportation Services" 
                    category="Service"
                    description="Transportation options for medical appointments and essential errands for care recipients."
                    linkText="View Options"
                    linkUrl="#"
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
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Caregiver's Comprehensive Handbook</h3>
                    <p className="text-gray-700 mb-6">
                      Our most complete resource with over 200 pages of practical advice, checklists, and guidance for caregivers at all stages of their journey.
                    </p>
                    <Button className="bg-purple hover:bg-purple-dark">
                      Download Free PDF
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h4 className="text-xl font-semibold mb-4">What's Inside:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-3 mt-0.5">1</div>
                      <span>Step-by-step guides for new caregivers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-3 mt-0.5">2</div>
                      <span>Daily care checklists and planning tools</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-3 mt-0.5">3</div>
                      <span>Communication tips for difficult conversations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-3 mt-0.5">4</div>
                      <span>Self-care strategies and burnout prevention</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-purple-900 mr-3 mt-0.5">5</div>
                      <span>Directory of national and local resources</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-purple-light">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Stay Updated with New Resources</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Subscribe to our monthly newsletter for the latest caregiving resources, upcoming events, and support group information.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-grow"
              />
              <Button className="bg-purple hover:bg-purple-dark px-6">
                Subscribe
              </Button>
            </div>
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
