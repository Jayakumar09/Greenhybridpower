import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import api from '../api/axios';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  systemSize: z.string().min(1, 'System size is required'),
  budget: z.string().optional(),
  avgBill: z.string().optional()
});

const GetQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(quoteSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/leads', { ...data, source: 'get-quote' });
      toast.success('Quote request submitted! We will contact you soon.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get Free Solar Quote</h1>
          <p className="text-xl text-primary-100">Get a customized quote based on your energy needs</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Request a Quote</h2>
                <p className="text-gray-500 text-sm">Tell us about your requirements</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input {...register('name')} className="input" placeholder="Your name" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input {...register('phone')} className="input" placeholder="+91XXXXXXXXXX" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input {...register('email')} className="input" placeholder="your@email.com" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Size Required *</label>
                <select {...register('systemSize')} className="input">
                  <option value="">Select system size</option>
                  <option value="1kW">1 kW</option>
                  <option value="2kW">2 kW</option>
                  <option value="3kW">3 kW</option>
                  <option value="5kW">5 kW</option>
                  <option value="7.5kW">7.5 kW</option>
                  <option value="10kW">10 kW</option>
                  <option value="other">Custom</option>
                </select>
                {errors.systemSize && <p className="text-red-500 text-sm mt-1">{errors.systemSize.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget</label>
                  <select {...register('budget')} className="input">
                    <option value="">Select budget</option>
                    <option value="under50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 - ₹1 Lakh</option>
                    <option value="1l-2l">₹1 Lakh - ₹2 Lakh</option>
                    <option value="2l-3l">₹2 Lakh - ₹3 Lakh</option>
                    <option value="above3l">Above ₹3 Lakh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Bill</label>
                  <select {...register('avgBill')} className="input">
                    <option value="">Select bill range</option>
                    <option value="under1k">Under ₹1,000</option>
                    <option value="1k-3k">₹1,000 - ₹3,000</option>
                    <option value="3k-5k">₹3,000 - ₹5,000</option>
                    <option value="5k-10k">₹5,000 - ₹10,000</option>
                    <option value="above10k">Above ₹10,000</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                {loading ? 'Submitting...' : <><CheckCircle className="w-5 h-5" /> Get Quote</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetQuote;