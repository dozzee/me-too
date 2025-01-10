// State Management
const state = {
  currentUser: null,
  isAuthenticated: false,
  currentPage: 'dashboard',
  portfolioData: [],
  tradingPairs: {
    'BTC/NGN': { price: 25890450, change: -2.14 },
    'ETH/NGN': { price: 1234567, change: 3.45 },
    'USDT/NGN': { price: 1234, change: 0.12 }
  }
};

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authTabs = document.querySelectorAll('.auth-tabs .tab');
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');
const logoutBtn = document.getElementById('logout-btn');

// Chart.js Configuration
const portfolioChartConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Portfolio Value (NGN)',
      data: [4000000, 3000000, 5000000, 2780000, 1890000, 2390000, 3490000],
      borderColor: '#00dc82',
      backgroundColor: 'rgba(0, 220, 130, 0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a1a1aa'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a1a1aa'
        }
      }
    }
  }
};

// Initialize Charts
function initializeCharts() {
  const portfolioCtx = document.getElementById('portfolio-chart');
  if (portfolioCtx) {
    new Chart(portfolioCtx, portfolioChartConfig);
  }

  const tradingCtx = document.getElementById('trading-chart');
  if (tradingCtx) {
    new Chart(tradingCtx, {
      ...portfolioChartConfig,
      data: {
        ...portfolioChartConfig.data,
        datasets: [{
          ...portfolioChartConfig.data.datasets[0],
          label: 'BTC/NGN'
        }]
      }
    });
  }
}

// Authentication
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Mock authentication
  if (email && password) {
    state.currentUser = { email };
    state.isAuthenticated = true;
    showDashboard();
  }
}

function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const phone = document.getElementById('register-phone').value;
  const password = document.getElementById('register-password').value;

  // Mock registration
  if (email && phone && password) {
    state.currentUser = { email, phone };
    state.isAuthenticated = true;
    showDashboard();
  }
}

function handleLogout() {
  state.currentUser = null;
  state.isAuthenticated = false;
  showAuth();
}

// Navigation
function navigateToPage(pageName) {
  state.currentPage = pageName;
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === `${pageName}-page`) {
      page.classList.add('active');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
}

// UI State Management
function showAuth() {
  authSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
}

function showDashboard() {
  authSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  initializeCharts();
}

// Mock Data Generation
function generateMockTransactions() {
  const transactions = [
    { type: 'buy', asset: 'BTC', amount: 0.0045, value: 234567, time: '2 hours ago' },
    { type: 'sell', asset: 'ETH', amount: 0.15, value: 123456, time: '5 hours ago' },
    { type: 'buy', asset: 'BTC', amount: 0.0023, value: 98765, time: '1 day ago' }
  ];

  const transactionsList = document.querySelector('.transactions-list');
  if (!transactionsList) return;

  transactionsList.innerHTML = transactions.map(tx => `
    <div class="transaction-item">
      <div class="transaction-info">
        <span class="transaction-type ${tx.type}">${tx.type === 'buy' ? 'Bought' : 'Sold'} ${tx.asset}</span>
        <span class="transaction-time">${tx.time}</span>
      </div>
      <div class="transaction-value">
        <span class="amount">${tx.amount} ${tx.asset}</span>
        <span class="value">₦${tx.value.toLocaleString()}</span>
      </div>
    </div>
  `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Auth tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const formType = tab.dataset.tab;
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (formType === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
      } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
      }
    });
  });

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navigateToPage(link.dataset.page);
    });
  });

  // Forms
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutBtn.addEventListener('click', handleLogout);

  // Initialize UI
  if (state.isAuthenticated) {
    showDashboard();
  } else {
    showAuth();
  }

  // Generate mock data
  generateMockTransactions();
});

// Trading functionality
const tradingPairSelect = document.getElementById('trading-pair');
const chartIntervalSelect = document.getElementById('chart-interval');
const orderForm = document.getElementById('order-form');
const orderAmount = document.getElementById('order-amount');
const orderPrice = document.getElementById('order-price');
const orderTotal = document.getElementById('order-total');

if (tradingPairSelect && orderForm) {
  tradingPairSelect.addEventListener('change', updateTradingPair);
  orderAmount.addEventListener('input', updateOrderTotal);
  orderPrice.addEventListener('input', updateOrderTotal);
  orderForm.addEventListener('submit', handleOrder);
}

function updateTradingPair() {
  const pair = tradingPairSelect.value;
  const pairData = state.tradingPairs[pair];
  if (pairData) {
    orderPrice.value = pairData.price;
    updateOrderTotal();
  }
}

function updateOrderTotal() {
  const amount = parseFloat(orderAmount.value) || 0;
  const price = parseFloat(orderPrice.value) || 0;
  orderTotal.value = (amount * price).toFixed(2);
}

function handleOrder(e) {
  e.preventDefault();
  // Mock order placement
  alert('Order placed successfully!');
  orderForm.reset();
}

// Initialize trading view if on trading page
if (document.getElementById('trade-page')) {
  updateTradingPair();
}