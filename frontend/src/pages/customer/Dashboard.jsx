import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, CreditCard, Wrench, Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, bookingsRes, quotationsRes, paymentsRes, installationsRes] = await Promise.all([
        api.get('/leads/my-leads'),
        api.get('/bookings/my-bookings'),
        api.get('/quotations/my-quotations'),
        api.get('/payments/my-payments'),
        api.get('/installations/my-installations')
      ]);
      setLeads(leadsRes.data.leads);
      setBookings(bookingsRes.data.bookings);
      setQuotations(quotationsRes.data.quotations);
      setPayments(paymentsRes.data.payments);
      setInstallations(installationsRes.data.installations);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'My Enquiries', value: leads.length, icon: <FileText className="w-6 h-6" />, link: '/customer/enquiries' },
    { title: 'Bookings', value: bookings.length, icon: <Calendar className="w-6 h-6" />, link: '/customer/bookings' },
    { title: 'Quotations', value: quotations.length, icon: <FileText className="w-6 h-6" />, link: '/customer/quotations' },
    { title: 'Payments', value: payments.length, icon: <CreditCard className="w-6 h-6" />, link: '/customer/payments' }
  ];

  const demoData = [
    { day: 'Mon', units: 8.5 },
    { day: 'Tue', units: 9.2 },
    { day: 'Wed', units: 8.8 },
    { day: 'Thu', units: 10.1 },
    { day: 'Fri', units: 9.5 },
    { day: 'Sat', units: 11.2 },
    { day: 'Sun', units: 10.8 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-500">Track your solar journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.link} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Energy Generation (Demo)</h3>
            <Zap className="w-5 h-5 text-primary-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="units" stroke="#16a34a" strokeWidth={2} dot={{ fill: '#16a34a' }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-500 text-sm mt-2">Last 7 days (kWh)</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/book-inspection" className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <Calendar className="w-5 h-5 text-primary-600 inline mr-2" />
              <span className="text-gray-700">Book Site Inspection</span>
            </Link>
            <Link to="/get-quote" className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <FileText className="w-5 h-5 text-primary-600 inline mr-2" />
              <span className="text-gray-700">Get New Quote</span>
            </Link>
            <Link to="/calculators" className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <TrendingUp className="w-5 h-5 text-primary-600 inline mr-2" />
              <span className="text-gray-700">Calculate Savings</span>
            </Link>
          </div>
        </div>
      </div>

      {installations.length > 0 && (
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Status</h3>
          <div className="space-y-4">
            {installations.slice(0, 1).map((inst) => (
              <div key={inst.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{inst.systemSize} kW System</span>
                  <span className={`px-2 py-1 rounded text-sm ${inst.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {inst.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: inst.status === 'completed' ? '100%' : '50%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Stage: {inst.stage?.replace('_', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;