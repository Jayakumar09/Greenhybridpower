import { Link } from 'react-router-dom';
import { Sun, Zap, Battery, Calculator, Wrench, CreditCard, ArrowRight, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: 'Solar Panels',
      description: 'High-efficiency monocrystalline panels with 25-year performance warranty'
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: 'Battery Backup',
      description: 'Lithium-ion batteries for uninterrupted power supply during outages'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Smart Inverters',
      description: 'Advanced inverters with real-time monitoring and grid synchronization'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Easy Financing',
      description: 'Flexible EMI options with competitive interest rates for solar systems'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Savings Calculator',
      description: 'Calculate your potential savings with our interactive solar calculators'
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Maintenance',
      description: 'Annual maintenance contracts for uninterrupted solar performance'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '₹75,000',
      size: '2kW',
      popular: false,
      features: ['2kW Solar Panel', '2kW Inverter', '5-Year Warranty', 'Free Installation']
    },
    {
      name: 'Hybrid',
      price: '₹1,45,000',
      size: '3kW',
      popular: true,
      features: ['3kW Solar Panel', '3kW Hybrid Inverter', '5kWh Battery', '10-Year Warranty', 'Free AMC']
    },
    {
      name: 'Premium',
      price: '₹2,45,000',
      size: '5kW',
      popular: false,
      features: ['5kW Solar Panel', '5kW Premium Inverter', '10kWh Battery', '15-Year Warranty', 'Priority Support']
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      text: 'Excellent service! My electricity bill reduced by 70%. The team was professional and completed installation on time.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      location: 'Hyderabad',
      text: 'Very happy with the hybrid system. Backup power during outages is a blessing. Great financing options too.',
      rating: 5
    },
    {
      name: 'Anil Reddy',
      location: 'Chennai',
      text: 'The ROI calculator helped me understand my savings. Staff is knowledgeable and guided me through the entire process.',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA5TDI0IDIxTDEyIDloTTM2IDloTDI0IDM5TDEyIDM5IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Solar Power for <br />
                <span className="text-yellow-400">Every Home</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-lg">
                Switch to clean solar energy and reduce your electricity bills by up to 90%. 
                Easy financing available with quick installation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg">
                  Get Free Quote
                </Link>
                <Link to="/book-inspection" className="btn border-2 border-white text-white hover:bg-primary-600 px-8 py-3 text-lg">
                  Book Inspection
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-primary-500">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-primary-200">Installations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹50L+</p>
                  <p className="text-primary-200">Customer Savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">25 Years</p>
                  <p className="text-primary-200">Warranty</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-[500px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center transform rotate-3">
                  <Sun className="w-64 h-64 text-white opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SISFS?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide end-to-end solar solutions with financing, installation, and maintenance support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solar Plans for Every Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of solar systems tailored to your energy requirements and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-primary-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-4xl font-bold text-primary-600 mt-2">{plan.price}</p>
                  <p className="text-gray-500">{plan.size} Solar System</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/get-quote" className="btn btn-primary w-full">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join hundreds of satisfied solar customers across India.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Go Solar?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get a free site inspection and customized quote for your home. No obligation!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-inspection" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Book Free Inspection
            </Link>
            <Link to="/calculators" className="btn border-2 border-white text-white hover:bg-primary-600 px-8 py-3 text-lg">
              Calculate Savings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;