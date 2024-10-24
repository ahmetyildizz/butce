export type BudgetStatus = 'Active' | 'Completed' | 'On Hold';
export type TransactionType = 'Income' | 'Expense';

export interface Budget {
  id: number;
  name: string;
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  startDate: string;
  endDate: string;
  status: BudgetStatus;
  projectId?: number;
  description?: string;
}

export interface Transaction {
  id: number;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  projectId?: number;
  taskId?: number;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  utilizationRate: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}