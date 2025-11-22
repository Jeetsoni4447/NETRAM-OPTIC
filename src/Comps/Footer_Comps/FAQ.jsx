import React, { useState } from 'react';

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are typically processed within 1-2 business days and delivered within 5-7 business days, depending on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery. Items must be unused and in original packaging. See our Returns page for full details.",
  },
  {
    question: "Do you offer prescription lenses?",
    answer:
      "Yes! You can upload your prescription during checkout and we’ll craft lenses just for you.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll receive a tracking link via email or SMS.",
  },
  {
    question: "Is international shipping available?",
    answer:
      "Currently, we only ship within India. International shipping will be coming soon!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-300 dark:border-gray-700 pb-4">
            <button
              onClick={() => toggle(i)}
              className="flex justify-between items-center w-full text-left text-lg font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
