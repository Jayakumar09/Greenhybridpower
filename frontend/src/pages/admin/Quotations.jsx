import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await api.get('/quotations');
      setQuotations(res.data.quotations);
    } catch (error) {
      toast.error('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    sent: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quotations</h1>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">System Size</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">EMI</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{quotation.customer?.name}</p>
                      <p className="text-sm text-gray-500">{quotation.customer?.email}</p>
                    </td>
                    <td className="px-4 py-3">{quotation.systemSize} kW</td>
                    <td className="px-4 py-3">₹{Number(quotation.finalPrice).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {quotation.emiAvailable ? `₹${Number(quotation.emiPerMonth).toLocaleString()}/mo` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm px-2 py-1 rounded ${statusColors[quotation.status]}`}>
                        {quotation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(quotation.createdAt).toLocaleDateString()}
                    </td>
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

export default AdminQuotations;