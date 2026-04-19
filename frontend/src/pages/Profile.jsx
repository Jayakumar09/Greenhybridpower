import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Save } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      reset(res.data.user);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put('/users/profile', data);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input {...register('name')} className="input pl-10" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input {...register('email')} className="input pl-10" disabled />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input {...register('phone')} className="input pl-10" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
            <input {...register('alternatePhone')} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
            <input {...register('aadharNumber')} className="input" placeholder="XXXX XXXX XXXX XXXX" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
            <input {...register('panNumber')} className="input" placeholder="XXXXXXXXXX" />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;