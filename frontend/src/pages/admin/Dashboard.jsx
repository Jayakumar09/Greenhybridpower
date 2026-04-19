import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Calendar, CreditCard, Wrench, Zap, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Leads', value: stats?.stats?.totalLeads || 0, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500', change: stats?.stats?.newLeads || 0, changeLabel: 'this month' },
    { title: 'Total Bookings', value: stats?.stats?.totalBookings || 0, icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-500', change: stats?.stats?.pendingBookings || 0, changeLabel: 'pending' },
    { title: 'Total Quotations', value: stats?.stats?.totalQuotations || 0, icon: <FileText className="w-6 h-6" />, color: 'bg-yellow-500', change: stats?.stats?.totalInstallations || 0, changeLabel: 'installed' },
    { title: 'Total Revenue', value: `₹${((stats?.stats?.revenue || 0) / 100000).toFixed(1)}L`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-green-500', change: stats?.stats?.pendingPayments || 0, changeLabel: 'pending payment' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            {stat.change > 0 && (
              <p className="text-primary-600 text-sm mt-2">
                {stat.change} {stat.changeLabel}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/admin/leads" className="card hover:shadow-md transition-shadow text-center">
          <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="font-medium">Manage Leads</p>
        </Link>
        <Link to="/admin/bookings" className="card hover:shadow-md transition-shadow text-center">
          <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="font-medium">Bookings</p>
        </Link>
        <Link to="/admin/payments" className="card hover:shadow-md transition-shadow text-center">
          <CreditCard className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="font-medium">Payments</p>
        </Link>
        <Link to="/admin/service-requests" className="card hover:shadow-md transition-shadow text-center">
          <Wrench className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="font-medium">Service Tickets</p>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Customers</span>
              <span className="font-semibold">{stats?.stats?.totalCustomers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Installations</span>
              <span className="font-semibold">{stats?.stats?.activeInstallations || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Service Requests</span>
              <span className="font-semibold">{stats?.stats?.openServiceRequests || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold">{stats?.stats?.conversionRate || 0}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;