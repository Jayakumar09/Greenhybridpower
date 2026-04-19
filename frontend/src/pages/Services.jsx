import { Link } from 'react-router-dom';
import { Sun, Battery, Zap, Calculator, Wrench, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Sun className="w-10 h-10" />,
      title: 'Solar Panel Installation',
      description: 'Professional installation of high-efficiency monocrystalline and poly crystalline solar panels for residential and commercial properties.',
      features: ['Site assessment', 'System design', 'Professional installation', 'Grid connection']
    },
    {
      icon: <Battery className="w-10 h-10" />,
      title: 'Battery Backup Systems',
      description: 'Lithium-ion and lead-acid battery solutions for uninterrupted power supply during grid outages.',
      features: ['5kWh to 15kWh capacity', 'Auto switchover', 'Long battery life', 'Smart monitoring']
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Solar Inverters',
      description: 'Advanced string and hybrid inverters with intelligent monitoring and grid synchronization capabilities.',
      features: ['High efficiency', 'Smart monitoring', 'Grid sync', 'Safety features']
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: 'Solar Financing',
      description: 'Flexible financing options including EMI, loans, and lease agreements for solar systems.',
      features: ['Low interest rates', 'Easy EMI', 'Quick approval', 'Flexible tenure']
    },
    {
      icon: <Calculator className="w-10 h-10" />,
      title: 'Energy Audit',
      description: 'Comprehensive energy consumption analysis to determine optimal solar system sizing.',
      features: ['Bill analysis', 'Load assessment', 'Savings projection', 'Custom recommendations']
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: 'AMC Services',
      description: 'Annual maintenance contracts for ensuring optimal performance of your solar system.',
      features: ['Quarterly visits', 'Cleaning', 'Performance check', 'Quick support']
    }
  ];

  const plans = [
    {
      name: 'Basic Solar',
      price: '₹75,000',
      systemSize: '2kW',
      panel: '4x 545W Monocrystalline',
      inverter: '2kW String Inverter',
      warranty: '5 Years',
      emi: '₹2,500/month'
    },
    {
      name: 'Hybrid Solar',
      price: '₹1,45,000',
      systemSize: '3kW',
      panel: '6x 545W Monocrystalline',
      inverter: '3kW Hybrid Inverter',
      battery: '5kWh Li-Ion',
      warranty: '10 Years',
      emi: '₹4,800/month'
    },
    {
      name: 'Premium Solar',
      price: '₹2,45,000',
      systemSize: '5kW',
      panel: '10x 545W Monocrystalline',
      inverter: '5kW Premium Hybrid',
      battery: '10kWh Li-Ion',
      warranty: '15 Years',
      emi: '₹8,100/month'
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Comprehensive solar solutions for residential and commercial needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solar Plans & Pricing</h2>
            <p className="text-gray-600">Choose the perfect system for your energy needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-primary-600 text-center mb-1">{plan.price}</p>
                <p className="text-gray-500 text-center mb-6">{plan.systemSize} System</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Panel</span>
                    <span className="font-medium">{plan.panel}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Inverter</span>
                    <span className="font-medium">{plan.inverter}</span>
                  </div>
                  {plan.battery && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Battery</span>
                      <span className="font-medium">{plan.battery}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Warranty</span>
                    <span className="font-medium">{plan.warranty}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-center text-gray-500 text-sm mb-2">Starting EMI</p>
                  <p className="text-center text-xl font-bold text-primary-600">{plan.emi}</p>
                </div>
                <Link to="/get-quote" className="btn btn-primary w-full mt-4">
                  Get Quote <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need Custom Solar Solution?</h2>
          <p className="text-xl text-primary-100 mb-8">Contact us for custom solar installations for commercial properties</p>
          <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;