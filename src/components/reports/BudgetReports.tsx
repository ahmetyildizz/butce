import React from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown,
  PieChart, ArrowUp, ArrowDown
} from 'lucide-react';

interface BudgetReportsProps {
  searchQuery: string;
  dateRange: string;
}

const BudgetReports: React.FC<BudgetReportsProps> = ({ searchQuery, dateRange }) => {
  // Mock data for demonstration
  const budgetStats = {
    totalBudget: 250000,
    spent: 175000,
    remaining: 75000,
    projectedOverrun: 15000,
    categories: {
      development: 45,
      design: 20,
      marketing: 15,
      infrastructure: 20
    }
  };

  const expenses = [
    {
      id: 1,
      category: 'Development',
      amount: 85000,
      trend: 5,
      status: 'under'
    },
    {
      id: 2,
      category: 'Design',
      amount: 45000,
      trend: -2,
      status: 'over'
    },
    {
      id: 3,
      category: 'Infrastructure',
      amount: 35000,
      trend: 3,
      status: 'under'
    }
  ];

  return (
    <div className="p-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <h3 className="text-2xl font-bold">${budgetStats.totalBudget.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Spent</p>
              <h3 className="text-2xl font-bold">${budgetStats.spent.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(budgetStats.spent / budgetStats.totalBudget) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <h3 className="text-2xl font-bold">${budgetStats.remaining.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Projected Overrun</p>
              <h3 className="text-2xl font-bold">${budgetStats.projectedOverrun.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="text-red-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Budget Distribution</h3>
            <PieChart className="text-gray-400" size={24} />
          </div>
          <div className="space-y-4">
            {Object.entries(budgetStats.categories).map(([category, percentage]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{category}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      category === 'development' ? 'bg-blue-500' :
                      category === 'design' ? 'bg-purple-500' :
                      category === 'marketing' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Expenses</h3>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{expense.category}</h4>
                  <p className="text-2xl font-bold mt-1">
                    ${expense.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${
                    expense.trend > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {expense.trend > 0 ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    <span>{Math.abs(expense.trend)}%</span>
                  </div>
                  <span className={`text-sm ${
                    expense.status === 'under' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {expense.status === 'under' ? 'Under Budget' : 'Over Budget'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetReports;