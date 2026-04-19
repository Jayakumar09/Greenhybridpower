import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminInstallations = () => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchInstallations(); }, []);

  const fetchInstallations = async () => {
    try {
      const res = await api.get('/installations');
      setInstallations(res.data.installations);
    } catch (error) {
      toast.error('Failed to fetch installations');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = { pending: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Installations</h1>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Stage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {installations.map((inst) => (
                  <tr key={inst.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{inst.customer?.name}</p>
                      <p className="text-sm text-gray-500">{inst.customer?.phone}</p>
                    </td>
                    <td className="px-4 py-3">{inst.systemSize} kW</td>
                    <td className="px-4 py-3 text-sm">{inst.stage?.replace('_', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm px-2 py-1 rounded ${statusColors[inst.status]}`}>{inst.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(inst.createdAt).toLocaleDateString()}</td>
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

export default AdminInstallations;