import React, { useState } from 'react';
import { 
  Wallet, PlusCircle, TrendingUp, TrendingDown,
  DollarSign, PieChart, BarChart2, Download
} from 'lucide-react';
import { Budget, Transaction, BudgetSummary, CostBreakdown } from '../types/budget';

// Mock data
const mockBudgetSummary: BudgetSummary = {
  totalBudget: 500000,
  totalSpent: 320000,
  totalRemaining: 180000,
  utilizationRate: 64
};

const mockBudgets: Budget[] = [
  {
    id: 1,
    name: 'Q1 Development Budget',
    totalAmount: 200000,
    spentAmount: 150000,
    remainingAmount: 50000,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'Active',
    projectId: 1,
    description: 'Budget for Q1 development activities'
  },
  {
    id: 2,
    name: 'Marketing Campaign',
    totalAmount: 100000,
    spentAmount: 75000,
    remainingAmount: 25000,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    status: 'Active',
    projectId: 2,
    description: 'Budget for spring marketing campaign'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-03-15',
    type: 'Expense',
    amount: 5000,
    category: 'Development',
    description: 'Software licenses',
    projectId: 1
  },
  {
    id: 2,
    date: '2024-03-14',
    type: 'Income',
    amount: 50000,
    category: 'Client Payment',
    description: 'Project milestone payment',
    projectId: 1
  }
];

const mockCostBreakdown: CostBreakdown[] = [
  { category: 'Development', amount: 150000, percentage: 46.875 },
  { category: 'Marketing', amount: 75000, percentage: 23.4375 },
  { category: 'Infrastructure', amount: 50000, percentage: 15.625 },
  { category: 'Operations', amount: 45000, percentage: 14.0625 }
];

const BudgetManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'costs' | 'add' | 'reports'>('overview');
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Budget Management</h1>
        <button
          onClick={() => setShowAddBudgetModal(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
            hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Add New Budget</span>
        </button>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <h3 className="text-2xl font-bold">
                ${mockBudgetSummary.totalBudget.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <h3 className="text-2xl font-bold">
                ${mockBudgetSummary.totalSpent.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Remaining Budget</p>
              <h3 className="text-2xl font-bold">
                ${mockBudgetSummary.totalRemaining.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Utilization Rate</p>
              <h3 className="text-2xl font-bold">{mockBudgetSummary.utilizationRate}%</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Wallet size={20} className="inline-block mr-2" />
            General Budget
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'costs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <BarChart2 size={20} className="inline-block mr-2" />
            Cost Tracking
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <TrendingUp size={20} className="inline-block mr-2" />
            Income/Expense Reports
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Active Budgets</h2>
              <button className="text-blue-500 hover:text-blue-600 flex items-center">
                <Download size={20} className="mr-2" />
                Export
              </button>
            </div>
            <div className="space-y-4">
              {mockBudgets.map((budget) => (
                <div key={budget.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{budget.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{budget.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${budget.status === 'Active' ? 'bg-green-100 text-green-800' :
                        budget.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {budget.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round((budget.spentAmount / budget.totalAmount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(budget.spentAmount / budget.totalAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Total Budget</div>
                      <div className="font-medium">${budget.totalAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Spent</div>
                      <div className="font-medium">${budget.spentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Remaining</div>
                      <div className="font-medium">${budget.remainingAmount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'costs' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <div>
                <h2 className="text-lg font-semibold mb-6">Cost Breakdown</h2>
                <div className="space-y-4">
                  {mockCostBreakdown.map((cost, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cost.category}</span>
                        <span>${cost.amount.toLocaleString()} ({cost.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${cost.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.category}</div>
                        <div className="text-xs text-gray-400">{transaction.date}</div>
                      </div>
                      <div className={`text-right ${
                        transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <div className="font-medium">
                          {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </div>
                        <div className="text-xs">{transaction.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income vs Expenses */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Income vs Expenses</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart will be implemented here
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Monthly Trend</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart will be implemented here
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManagement;