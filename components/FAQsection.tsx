// components/FAQSection.tsx
import { useState } from 'react';

export type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  faqs?: FAQ[];
  className?: string;
  bgColor?: 'white' | 'gray' | 'transparent';
};

// Default FAQ questions
const defaultFAQs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "We provide a comprehensive range of services including web development, mobile app development, UI/UX design, digital marketing, and technical consulting. Our team specializes in creating custom solutions tailored to your specific business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on factors like complexity, timeline, and required features. We offer transparent pricing with no hidden fees. Contact us for a free consultation and custom quote based on your specific requirements."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive support and maintenance packages to ensure your project continues to perform optimally. This includes regular updates, security patches, bug fixes, and technical support. We have flexible maintenance plans to suit different needs and budgets."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with modern technologies including React, Next.js, Node.js, Python, TypeScript, AWS, and more. Our team stays current with the latest industry standards and chooses the best technology stack for each project based on requirements and scalability needs."
  },
  {
    question: "Can you work with our existing systems?",
    answer: "Absolutely! We have extensive experience integrating with existing systems, databases, and third-party services. We can modernize legacy systems, create APIs for system integration, and ensure seamless compatibility with your current infrastructure."
  },
  {
    question: "How do you ensure project quality?",
    answer: "We follow industry best practices including code reviews, automated testing, quality assurance processes, and regular client feedback sessions. Every project goes through multiple testing phases before delivery to ensure it meets our high standards and your expectations."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular sprints and client check-ins. The process includes discovery, planning, design, development, testing, and deployment phases. You'll receive regular updates and have opportunities to provide feedback throughout the project."
  }
];

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  faqs = defaultFAQs,
  className = "",
  bgColor = 'gray'
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent'
  };

  return (
    <section className={`py-16 ${backgroundClasses[bgColor]} ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span 
                  className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}