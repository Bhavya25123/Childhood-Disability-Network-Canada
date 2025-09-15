import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What financial supports are available for families with disabled children?",
    answer:
      "Families may qualify for the Child Disability Benefit (CDB), Disability Tax Credit, and various provincial programs. Check eligibility on Canada.ca or provincial ministry websites.",
  },
  {
    question: "How can I find respite care in my area?",
    answer:
      "Respite care is offered by many provincial disability services and community organizations. Visit FamilyCaregiversBC or your local health authority to explore options.",
  },
  {
    question: "Are there educational supports for children with disabilities?",
    answer:
      "Yes. School boards across Canada provide Individualized Education Plans (IEPs), special education teachers, and accessibility accommodations. Connect with your child’s school to start the process.",
  },
  {
    question: "Where can caregivers find mental health resources?",
    answer:
      "Caregivers can access counselling through provincial health programs, caregiver support hotlines, and nonprofit groups like the Canadian Mental Health Association (CMHA).",
  },
];

export default function KnowledgeHub() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-0">
      <h2 className="text-2xl text-purple-900 font</h2>-bold mb-3 text-center">Quick FAQs</h2>
      <p className="text-gray-600 mb-8 text-center">
        Find quick answers to common questions for caregivers and families.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full justify-between items-center p-4 text-left focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="p-4 pt-0 text-gray-600"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
