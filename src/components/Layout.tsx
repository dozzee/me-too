import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  Home, 
  LineChart, 
  Wallet, 
  BookOpen, 
  Gift, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: LineChart, label: 'Trade', path: '/trade' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: BookOpen, label: 'Learn', path: '/learn' },
    { icon: Gift, label: 'Rewards', path: '/rewards' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center space-x-2 mb-8">
        <LineChart className="w-8 h-8 text-green-400" />
        <span className="text-xl font-bold">Coinbase NG</span>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-green-500 text-white' 
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-800 text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;