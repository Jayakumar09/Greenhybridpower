import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How does solar panel installation work?',
      answer: 'Our process starts with a free site inspection where our experts assess your property\'s suitability for solar. Based on your energy consumption and requirements, we design a customized system and provide a quote. Once approved, our certified technicians complete the installation typically within 3-5 days for residential systems.'
    },
    {
      question: 'What is the lifespan of solar panels?',
      answer: 'Solar panels typically have a lifespan of 25-30 years. Most manufacturers offer performance warranties of 25 years, guaranteeing at least 80% efficiency at the end of the warranty period. Our panels come with comprehensive warranties for peace of mind.'
    },
    {
      question: 'How much can I save with solar?',
      answer: 'Savings depend on your current electricity consumption. On average, our customers save 70-90% on their electricity bills. With net metering, you can also earn credits for excess energy exported to the grid.'
    },
    {
      question: 'Do I need battery backup?',
      answer: 'Battery backup is optional but recommended for areas with frequent power cuts. Hybrid solar systems with batteries provide uninterrupted power during outages. We offer both grid-tied (without battery) and hybrid (with battery) solutions.'
    },
    {
      question: 'What financing options are available?',
      answer: 'We offer multiple financing options including easy EMI plans (starting from ₹2,500/month), solar loans with competitive interest rates, and lease options. Our team can help you choose the best option based on your budget.'
    },
    {
      question: 'How much maintenance do solar panels need?',
      answer: 'Solar panels require minimal maintenance. We recommend annual cleaning and inspection to ensure optimal performance. Our AMC (Annual Maintenance Contract) packages cover all maintenance needs including cleaning, performance checks, and troubleshooting.'
    },
    {
      question: 'What is net metering?',
      answer: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. When your panels produce more than you consume, the excess is sent to the grid, and you receive credits that offset your electricity costs.'
    },
    {
      question: 'Is my property suitable for solar?',
      answer: 'Most properties are suitable for solar if they have adequate roof space (at least 100-150 sq ft for a basic system), proper sunlight exposure, and structural capacity. Our site inspection team will assess your property and recommend the best solution.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-primary-100">Find answers to common questions about solar energy</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  {openIndex === index ? <ChevronUp className="w-5 h-5 text-primary-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;