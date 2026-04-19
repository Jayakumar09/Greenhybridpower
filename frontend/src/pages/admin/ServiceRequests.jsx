import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/service-requests');
      setRequests(res.data.requests);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/service-requests/${id}`, { status });
      toast.success('Status updated');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-yellow-100 text-yellow-700', resolved: 'bg-green-100 text-green-700' };
  const priorityColors = { low: 'bg-gray-100', medium: 'bg-yellow-100', high: 'bg-red-100' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Service Requests</h1>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Issue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{req.customer?.name}</p>
                      <p className="text-sm text-gray-500">{req.customer?.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{req.type}</td>
                    <td className="px-4 py-3 text-sm">{req.issue}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm px-2 py-1 rounded ${priorityColors[req.priority]}`}>{req.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select value={req.status} onChange={(e) => updateStatus(req.id, e.target.value)} className={`text-sm px-2 py-1 rounded ${statusColors[req.status]}`}>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</td>
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

export default AdminServiceRequests;