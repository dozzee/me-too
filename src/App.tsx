import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Trade = React.lazy(() => import('./pages/Trade'));
const Wallet = React.lazy(() => import('./pages/Wallet'));
const Learn = React.lazy(() => import('./pages/Learn'));
const Rewards = React.lazy(() => import('./pages/Rewards'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Auth = React.lazy(() => import('./pages/Auth'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <React.Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      }>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="trade" element={<Trade />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="learn" element={<Learn />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;