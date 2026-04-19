import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchCustomers(); }, [search]);

  const fetchCustomers = async () => {
    try {
      const params = search ? `?search=${search}` : '';
      const res = await api.get(`/admin/customers${params}`);
      setCustomers(res.data.customers);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
      <div className="card mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" />
        </div>
      </div>
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quotes</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Installations</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm">{customer._count?.quotations || 0}</td>
                    <td className="px-4 py-3 text-sm">{customer._count?.installations || 0}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;