import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Calendar, MapPin, User, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import api from '../api/axios';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Valid pincode required'),
  address: z.string().min(10, 'Address is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  scheduledDate: z.string().min(1, 'Date is required'),
  scheduledTime: z.string().min(1, 'Time is required')
});

const BookInspection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/leads', { ...data, name: data.name, email: data.email, phone: data.phone, source: 'book-inspection' });
      await api.post('/bookings', data);
      toast.success('Inspection booked successfully!');
      navigate('/customer');
    } catch (error) {
      toast.error('Failed to book inspection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Book Free Site Inspection</h1>
          <p className="text-xl text-primary-100">Our experts will visit your property and assess the best solar solution</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Schedule Your Visit</h2>
                <p className="text-gray-500 text-sm">Fill the form below to book inspection</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input {...register('name')} className="input pl-10" placeholder="Your name" />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input {...register('phone')} className="input pl-10" placeholder="+91XXXXXXXXXX" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input {...register('email')} className="input pl-10" placeholder="your@email.com" />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                  <select {...register('propertyType')} className="input">
                    <option value="">Select type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                  {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea {...register('address')} className="input pl-10" rows="2" placeholder="Full address"></textarea>
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input {...register('city')} className="input" placeholder="City" />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input {...register('state')} className="input" placeholder="State" />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input {...register('pincode')} className="input" placeholder="XXXXXX" />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input type="date" {...register('scheduledDate')} className="input" min={new Date().toISOString().split('T')[0]} />
                  {errors.scheduledDate && <p className="text-red-500 text-sm mt-1">{errors.scheduledDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                  <select {...register('scheduledTime')} className="input">
                    <option value="">Select time</option>
                    <option value="09:00 - 11:00">09:00 - 11:00</option>
                    <option value="11:00 - 13:00">11:00 - 13:00</option>
                    <option value="14:00 - 16:00">14:00 - 16:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                  </select>
                  {errors.scheduledTime && <p className="text-red-500 text-sm mt-1">{errors.scheduledTime.message}</p>}
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                {loading ? 'Booking...' : <><CheckCircle className="w-5 h-5" /> Book Inspection</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookInspection;