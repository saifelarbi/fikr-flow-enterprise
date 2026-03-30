'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

export interface Client {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  tax_id?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getClients();
      setClients(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const newClient = await apiClient.createClient(clientData);
      setClients([...clients, newClient]);
      return newClient;
    } catch (err) {
      throw err;
    }
  };

  const updateClient = async (id: number, clientData: Partial<Client>) => {
    try {
      const updated = await apiClient.updateClient(id.toString(), clientData);
      setClients(clients.map((c) => (c.id === id ? updated : c)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteClient = async (id: number) => {
    try {
      await apiClient.deleteClient(id.toString());
      setClients(clients.filter((c) => c.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}
