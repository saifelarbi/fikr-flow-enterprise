'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

export interface Expense {
  id: number;
  user_id: number;
  description: string;
  category: string;
  amount: string;
  expense_date: string;
  payment_method?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFilters {
  category?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
}

export function useExpenses(filters?: ExpenseFilters) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getExpenses(filters);
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (
    expenseData: Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newExpense = await apiClient.createExpense(expenseData);
      setExpenses([...expenses, newExpense]);
      return newExpense;
    } catch (err) {
      throw err;
    }
  };

  const updateExpense = async (id: number, expenseData: Partial<Expense>) => {
    try {
      const updated = await apiClient.updateExpense(id.toString(), expenseData);
      setExpenses(expenses.map((e) => (e.id === id ? updated : e)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await apiClient.deleteExpense(id.toString());
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters?.category, filters?.status, filters?.date_from, filters?.date_to]);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}
