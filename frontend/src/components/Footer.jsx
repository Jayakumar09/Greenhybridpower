import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SISFS</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Sustainable Integrated Smart Financing System for solar energy adoption in India. 
              We connect solar energy with financing, installation, and lifecycle service management.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors">Services</Link></li>
              <li><Link to="/calculators" className="text-gray-400 hover:text-primary-500 transition-colors">Solar Calculators</Link></li>
              <li><Link to="/book-inspection" className="text-gray-400 hover:text-primary-500 transition-colors">Book Inspection</Link></li>
              <li><Link to="/get-quote" className="text-gray-400 hover:text-primary-500 transition-colors">Get Quote</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>GreenHybridPower, India</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@greenhybridpower.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SISFS - GreenHybridPower. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;