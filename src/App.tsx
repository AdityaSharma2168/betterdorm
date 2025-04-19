import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Listings from './pages/listings/Listings';
import ListingDetail from './pages/listings/ListingDetail';
import RoommateMatching from './pages/roommates/RoommateMatching';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import CreateListing from './pages/createlisting/createlisting';
// Layout
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={
            <ProtectedRoute>
              <MainLayout><CreateListing /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/listings" element={
            <ProtectedRoute>
              <MainLayout><Listings /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/listings/:id" element={
            <ProtectedRoute>
              <MainLayout><ListingDetail /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/roommates" element={
            <ProtectedRoute>
              <MainLayout><RoommateMatching /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout><Profile /></MainLayout>
            </ProtectedRoute>
          } />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;