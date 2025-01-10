import React from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const mockData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const Dashboard: React.FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Portfolio Value Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Portfolio Value</p>
              <h3 className="text-2xl font-bold">₦2,458,000</h3>
            </div>
            <Wallet className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+5.23% today</span>
          </div>
        </div>

        {/* Bitcoin Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Bitcoin</p>
              <h3 className="text-2xl font-bold">₦25,890,450</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold">₿</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-500">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span className="text-sm">-2.14% today</span>
          </div>
        </div>

        {/* Ethereum Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Ethereum</p>
              <h3 className="text-2xl font-bold">₦1,234,567</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-bold">Ξ</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+3.45% today</span>
          </div>
        </div>

        {/* Naira Balance Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Naira Balance</p>
              <h3 className="text-2xl font-bold">₦500,000</h3>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <button className="text-green-500 text-sm font-medium">
              Add funds →
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </Chart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index % 2 === 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {index % 2 === 0 ? (
                    <TrendingUp className={`w-5 h-5 text-green-600`} />
                  ) : (
                    <TrendingDown className={`w-5 h-5 text-red-600`} />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {index % 2 === 0 ? 'Bought Bitcoin' : 'Sold Ethereum'}
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {index % 2 === 0 ? '+0.0045 BTC' : '-0.15 ETH'}
                </p>
                <p className={`text-sm ${
                  index % 2 === 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ₦234,567
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;