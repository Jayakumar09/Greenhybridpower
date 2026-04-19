import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success('Booking updated');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    rescheduled: 'bg-yellow-100 text-yellow-700'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Inspections</h1>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Property Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{booking.customer?.name}</p>
                      <p className="text-sm text-gray-500">{booking.customer?.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{booking.scheduledTime}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {booking.city}, {booking.state}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{booking.propertyType}</td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className={`text-sm px-2 py-1 rounded ${statusColors[booking.status]}`}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                      </select>
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

export default AdminBookings;