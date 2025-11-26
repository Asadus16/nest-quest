import React, { useState } from "react";

const FAQSection = ({ regionName }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "What are the best places to stay in Dubai?",
    "What are some of the best things to do in Dubai?",
    "What are the best places to visit in Dubai?",
    "What are some family activities we can do in Dubai?",
    "Are there any pet friendly accommodations available in Dubai?",
    "What is Dubai known for?",
    "What are the best foods to try in Dubai?",
    "What is the nightlife in Dubai like?",
    "Are there family friendly vacation rentals in Dubai?",
    "What are the best things to do in Dubai with kids?",
    "How is the weather in Dubai?",
    "What are some hiking trails in Dubai?",
    "What are some of the best day trip ideas from Dubai?",
    "What are some local tips for visiting Dubai?",
    "What are the best hidden gems to explore in Dubai?",
    "What should I bring for a trip to Dubai?",
    "What are the most popular events or festivals in Dubai?",
    "When is the best time to visit Dubai?",
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 1md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-grey-dim pb-6 pt-2 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">{faq}</p>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {openIndex === index && (
              <div className="mt-6 text-grey">
                <p>
                  In a real
                  implementation, you would fetch the actual answer from your
                  data source.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;