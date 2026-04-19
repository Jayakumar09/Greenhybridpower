import { Sun, Target, Eye, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SISFS</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Sustainable Integrated Smart Financing System for a greener tomorrow
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering India with Clean Solar Energy</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SISFS (Sustainable Integrated Smart Financing System) is a comprehensive platform 
                  connecting solar energy adoption with financing, installation, and lifecycle service 
                  management across India.
                </p>
                <p>
                  We believe that everyone deserves access to clean, affordable energy. Our mission is 
                  to make solar power accessible to every home and business in India through innovative 
                  financing solutions and world-class installation services.
                </p>
                <p>
                  With years of experience in the solar industry, we have helped hundreds of families 
                  switch to solar energy and reduce their electricity bills significantly while 
                  contributing to a cleaner environment.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-6 rounded-xl text-center">
                <Sun className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary-600">500+</p>
                <p className="text-gray-600">Installations</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-xl text-center">
                <Users className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary-600">400+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-xl text-center">
                <Award className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary-600">25+</p>
                <p className="text-gray-600">Years Warranty</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-xl text-center">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary-600">90%</p>
                <p className="text-gray-600">Bill Savings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To accelerate India's transition to sustainable energy by providing accessible, 
                affordable, and reliable solar solutions with seamless financing and 
                world-class customer service.
              </p>
            </div>
            <div className="card">
              <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600 mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be India's most trusted solar energy partner, making clean energy a reality 
                for every home and business while contributing to a sustainable future for 
                generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose GreenHybridPower?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Sun className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Tier-1 solar panels with international certifications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Certified engineers with 10+ years experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Support</h3>
              <p className="text-gray-600">24/7 customer support and maintenance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;