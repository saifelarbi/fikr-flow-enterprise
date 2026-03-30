'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

export interface StatsData {
  revenue: number;
  expenses: number;
  profit: number;
  pending_invoices: number;
  total_clients: number;
  date_from: string;
  date_to: string;
  revenue_by_type: Record<string, { type: string; total: string }>;
  expenses_by_category: Array<{ category: string; total: string; count: number }>;
}

export interface DashboardStats {
  revenue: number;
  expenses: number;
  profit: number;
  pendingInvoices: number;
  totalClients: number;
  dateFrom: string;
  dateTo: string;
  revenueByType: Array<{ type: string; value: number }>;
  expensesByCategory: Array<{ category: string; value: number; count: number }>;
}

export function useDashboardStats(dateFrom?: string, dateTo?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getDashboardStats();
      
      // Transform API response to match our interface
      const transformed: DashboardStats = {
        revenue: response.revenue || 0,
        expenses: response.expenses || 0,
        profit: response.profit || 0,
        pendingInvoices: response.pending_invoices || 0,
        totalClients: response.total_clients || 0,
        dateFrom: response.date_from,
        dateTo: response.date_to,
        revenueByType: Object.values(response.revenue_by_type || {}).map((item: any) => ({
          type: item.type === 'SELLING' ? 'Selling' : 'Buying',
          value: parseFloat(item.total || 0),
        })),
        expensesByCategory: response.expenses_by_category.map((item: any) => ({
          category: item.category,
          value: parseFloat(item.total || 0),
          count: item.count,
        })),
      };

      setStats(transformed);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dateFrom, dateTo]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
