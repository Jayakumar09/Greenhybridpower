import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.get('/payments');
      setPayments(res.data.payments);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = { pending: 'bg-yellow-100 text-yellow-700', completed: 'bg-green-100 text-green-700', failed: 'bg-red-100 text-red-700' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mode</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{payment.customer?.name}</p>
                    </td>
                    <td className="px-4 py-3">₹{Number(payment.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{payment.paymentType}</td>
                    <td className="px-4 py-3 text-sm">{payment.paymentMode || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm px-2 py-1 rounded ${statusColors[payment.status]}`}>{payment.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
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

export default AdminPayments;