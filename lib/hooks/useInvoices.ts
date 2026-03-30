'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

export interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface Invoice {
  id: number;
  user_id: number;
  client_id: number;
  type: 'BUYING' | 'SELLING';
  invoice_number: string;
  invoice_date: string;
  due_date?: string;
  subtotal: string;
  tax?: string;
  total: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  notes?: string;
  items: InvoiceItem[];
  created_at: string;
  updated_at: string;
  client?: { id: number; name: string; email: string };
}

export function useInvoices(type?: 'BUYING' | 'SELLING') {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getInvoices(type);
      setInvoices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (
    invoiceData: Omit<Invoice, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'client'>
  ) => {
    try {
      const newInvoice = await apiClient.createInvoice(invoiceData);
      setInvoices([...invoices, newInvoice]);
      return newInvoice;
    } catch (err) {
      throw err;
    }
  };

  const updateInvoice = async (id: number, invoiceData: Partial<Invoice>) => {
    try {
      const updated = await apiClient.updateInvoice(id.toString(), invoiceData);
      setInvoices(invoices.map((i) => (i.id === id ? updated : i)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteInvoice = async (id: number) => {
    try {
      await apiClient.deleteInvoice(id.toString());
      setInvoices(invoices.filter((i) => i.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [type]);

  return {
    invoices,
    loading,
    error,
    refetch: fetchInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
