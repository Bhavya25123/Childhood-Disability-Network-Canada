import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const ImageRunningBanner = lazy(() => import("@/components/Support/ImageRunningBanner"));

export const AdvocacySection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-indigo-50 px-6 py-10 lg:px-20">
      <div className="flex">
        {/* Added detailed advocacy content */}
        <div className=" bg-white/70 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            In Canada, <span className="text-purple-700">DISABILITY POVERTY</span> Begins at Birth
          </h3>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h4>
          <p className="text-gray-700 leading-relaxed mb-6">
            We prepared this budget submission on behalf of caregivers and their children/youth with disabilities. Families whose children have complex needs (e.g. medical, intellectual, physical and behavioural) are in crisis across Canada due to inequalities in funding and services to support these children from birth onwards into adulthood. When families seek assistance, many community agencies cannot provide adequate support due to funding constraints with outdated and discriminatory policies.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are confident the recommendations outlined in this budget submission can significantly improve the lives of children with disabilities and their families. With your government’s action through critical resources and targeted policy changes, these families can benefit more equitably throughout their lifespan. Policy changes in other countries such as Australia and New Zealand, have resulted in a positive outlook for their citizens with disabilities and their national economies. (National Disability Insurance Agency 2020)
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">Recommendations for Children &amp; Youth with Disabilities</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-800 mb-8">
            <li id="header-1">Create a Lifetime Caregiver Income Benefit</li>
            <li>Triple the Child Disability Benefit</li>
            <li>Create Home &amp; Vehicle Accessibility Grants</li>
          </ol>

          <h4 className="text-xl font-semibold text-gray-800 mb-3" >1. Necessity of a Lifetime Caregiver Income Benefit</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Family caregiving is at the core of what sustains children &amp; youth with complex care needs. Direct care and care coordination is a full-time job and creates huge barriers to employment. (Finlay et al. 2023; youtube 2022)
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a result, lifetime caregivers are often forced to make major financial sacrifices including loss of employment income, pensions, and workplace benefits. Families are pushed towards poverty as disability-related expenses continue to rise and compound. (Lenahan 2021; Sarangi Leila 2021; Zafar 2023)
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Caregivers are often forced to make life-altering decisions to help loved ones with disabilities remain in their homes. These sacrifices negatively impact the financial, physical, and mental health status of families for years to come.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We ask you to create a robust <span className="font-semibold">Lifetime Caregiver Income Benefit*</span> that recognizes the important full-time work of family caregivers. <span className="font-semibold">Modelled on the Caregiver Recovery Benefit*</span>
          </p>

          <figure className="my-6">
            <img
              src="/images/advocacy-section1.jpg"
              alt="Care map for a child with multiple disabilities"
              className="w-full max-w-3xl mx-auto rounded-xl border border-gray-200"
            />
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              Care map for a child with multiple disabilities.
            </figcaption>
          </figure>

          <h5 className="text-lg font-semibold text-gray-800 mb-2">Image Description:</h5>
          <p className="text-gray-700 leading-relaxed mb-6">
            Shows a complex web of bubbles linked to a child who is centred within a vast matrix of care providers with close to 100 contacts throughout the community, hospital, and home. This means that the caregiver—traditionally the mother of a child with complex needs—is using all her waking time either coordinating care or providing direct care to her child 24 hours, 7 days a week. There is no job which requires such skills, focus, and compassion with no compensation. This work is done with tremendous love, but it takes a financial, physical, and mental health toll on families and most commonly mothers. (Bourke-Taylor et al. 2010)
          </p>
          <p className="text-gray-700 leading-relaxed mb-6" id="header-2">
            The province of New Brunswick recognized the significant cost involved in raising children with complex needs (such as emotional, behavioural, medical, or related to mental health or trauma) is valued at $3500 a month with an additional $1769 in 2022. These funds are paid to adults (foster care parents) to stay at home and focus on their care. (Cave 2022)
          </p>
          <p className="text-gray-700 leading-relaxed mb-8 font-semibold">
            We ask you to create a lifetime caregiver income benefit across the lifespan.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">2. Importance of Tripling the Child Disability Benefit</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            During these last 3 years of the pandemic, families with children &amp; youth who have complex disabilities have been disproportionately impacted. Along with years of inflating costs and eroding provincial programs, we have not yet seen the doubling of the CDB as promised to us for many years.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 2019 mandate letter to the Minister mandated: “Double the Child Disability Benefit and work with families and experts to ensure the Benefit is effective in providing help as most needed” (Trudeau 2019)
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The current maximum benefit of $242/month is not supportive when we face such extraordinary costs for specialized care, therapy, equipment, and home &amp; vehicle modifications which can be more than $40,000 annually. (McIntyre 2019)
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Income testing the CDB is financially challenging for families. We recommend shifting the income threshold higher to better reflect the financial demands of having a child with complex care needs. The current threshold for reducing the CDB is $71,060 to $165,000. We recommend removing altogether or setting the reduction at $150K and scaling to $250K.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8" id="header-3">
            We understand that the current plans for the new Canada Disability Benefit are aimed at adults between the ages 18-65. We ask for consideration of automatically transitioning those people with disabilities whose caregivers are receiving the Child Disability Benefit into the Canada Disability Benefit program upon their 18th birthday.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 font-semibold">
            We ask you to triple the Child Disability Benefit to $726.00 per month. 
          </p>
          <h4 className="text-xl font-semibold text-gray-800 mb-3">3. Need for Home &amp; Vehicle Modifications Grants for Accessibility</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Home modifications for accessibility are an absolute necessity for the safety and well-being of children with physical disabilities and their family caregivers. Adapted vehicles are essential to meet the right to inclusion in the community. Unfortunately, these modifications are cost-prohibitive for the majority of families, many go without and are marginalized as a result.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Federal Budget 2022 launched the refundable <span className="font-semibold">Multigenerational Home Renovation Tax Credit of $7500.</span> However, this new credit excluded families who need to make accessibility modifications earlier in their children’s lives to prepare for supporting them at home into adulthood. (Ricci 2022)
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tax credits such as the Multigenerational Home Renovation Tax Credit must include families with children with disabilities.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            According to Easter Seals Canada, “A specially designed walker can cost up to $2,500. A customized power wheelchair can cost more than $25,000. A porch lift can cost upwards of $5,000.” To meet these increasingly costly but needed supports, The Home Accessibility Tax Credit needs to be significantly increased beyond $3000. Consideration should be made to having the credit refundable for those whose income is under $150K. (Crawford 2019; Malacrida 2010)
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Create funding opportunities for families who require accessible rental housing including rent subsidies and equipment grants suitable for adapting rental property. 
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 font-semibold">
            We ask you to create Home &amp; Vehicle Modifications Accessibility Grants across the lifespan.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mb-3">In Conclusion</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a committed signatory of the <span className="font-semibold">United Nations Convention of Rights for persons with disabilities &amp; United Nations Convention on the Rights of the Child</span>, we urge this government to make essential policy changes and demonstrate your commitment through action.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our recommendations would make significant strides in reducing childhood disability poverty. Children have the right to thrive at home with their families in a way that is more equitable with their peers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We ask you to use a rights-based approach to policy for a better future for all people with disabilities living in Canada, including children &amp; youth. (Lai (PhD) and Shikako-Thomas, PhD 2018)
          </p>
          <p className="text-gray-800 font-semibold mt-6">
            Let’s support our children with disabilities and their families throughout their lifetime. We ask your government to implement a lifetime caregiver income benefit, triple the Child Disability Benefit and create accessibility grants for home and vehicle modifications. Through these actions, we will work together to create a barrier-free Canada.
          </p>
        </div>
      </div>
       <section className="py-10 px-8 ">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent text-center font-semibold mb-10">Caregiver Advocacy Moments</h2>
            <h2 className="sr-only">Caregiver Advocacy Moments</h2>
            <Suspense fallback={
              <div className="h-64 md:h-100 lg:h-[580px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-900 border-r-transparent"></div>
              </div>
            }>
              <ImageRunningBanner
                items={[
                  { src: "/images/joc-1.jpg", alt: "Parent caregiver and child at home with ICU level medical equipment and nursing care" },
                  { src: "/images/joc-2.jpg", alt: "Young children advocating for better supports and services, visiting Member of Provincial Parliament (MPPs) at Queen's Park, Ontario Legislature" },
                  { src: "/images/joc-3.jpg", alt: "Caregiver advocating to Member of Parliament (MP)" },
                ]}
                maxWidthClass="max-w-5xl"
                heightClass="h-64 md:h-100 lg:h-[580px]"
                className="rounded-xl"
                interval={5500}
              />
            </Suspense>
          </div>
        </section>
    </section>

    
  );
};
