import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Calculators from './pages/Calculators';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import CustomerDashboard from './pages/customer/Dashboard';
import AdminLeads from './pages/admin/Leads';
import AdminBookings from './pages/admin/Bookings';
import AdminQuotations from './pages/admin/Quotations';
import AdminInstallations from './pages/admin/Installations';
import AdminPayments from './pages/admin/Payments';
import AdminServiceRequests from './pages/admin/ServiceRequests';
import AdminCustomers from './pages/admin/Customers';
import BookInspection from './pages/BookInspection';
import GetQuote from './pages/GetQuote';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-inspection" element={<BookInspection />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/leads" element={<ProtectedRoute adminOnly><AdminLeads /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/quotations" element={<ProtectedRoute adminOnly><AdminQuotations /></ProtectedRoute>} />
          <Route path="/admin/installations" element={<ProtectedRoute adminOnly><AdminInstallations /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute adminOnly><AdminPayments /></ProtectedRoute>} />
          <Route path="/admin/service-requests" element={<ProtectedRoute adminOnly><AdminServiceRequests /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute adminOnly><AdminCustomers /></ProtectedRoute>} />
          
          <Route path="/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;