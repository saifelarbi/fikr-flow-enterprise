// API Client for communicating with Laravel backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('authToken') 
      : null;
    
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: unknown
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Clients
  async getClients() {
    return this.request('/clients', 'GET');
  }

  async getClient(id: string) {
    return this.request(`/clients/${id}`, 'GET');
  }

  async createClient(data: any) {
    return this.request('/clients', 'POST', data);
  }

  async updateClient(id: string, data: any) {
    return this.request(`/clients/${id}`, 'PUT', data);
  }

  async deleteClient(id: string) {
    return this.request(`/clients/${id}`, 'DELETE');
  }

  // Invoices
  async getInvoices(type?: 'BUYING' | 'SELLING') {
    const endpoint = type ? `/invoices?type=${type}` : '/invoices';
    return this.request(endpoint, 'GET');
  }

  async getInvoice(id: string) {
    return this.request(`/invoices/${id}`, 'GET');
  }

  async createInvoice(data: any) {
    return this.request('/invoices', 'POST', data);
  }

  async updateInvoice(id: string, data: any) {
    return this.request(`/invoices/${id}`, 'PUT', data);
  }

  async deleteInvoice(id: string) {
    return this.request(`/invoices/${id}`, 'DELETE');
  }

  // Expenses
  async getExpenses(filters?: { category?: string; status?: string; date_from?: string; date_to?: string }) {
    let endpoint = '/expenses';
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      endpoint += `?${params.toString()}`;
    }
    return this.request(endpoint, 'GET');
  }

  async getExpense(id: string) {
    return this.request(`/expenses/${id}`, 'GET');
  }

  async createExpense(data: any) {
    return this.request('/expenses', 'POST', data);
  }

  async updateExpense(id: string, data: any) {
    return this.request(`/expenses/${id}`, 'PUT', data);
  }

  async deleteExpense(id: string) {
    return this.request(`/expenses/${id}`, 'DELETE');
  }

  // Stats
  async getDashboardStats(dateRange?: string) {
    const endpoint = dateRange ? `/stats/summary?dateRange=${dateRange}` : '/stats/summary';
    return this.request(endpoint, 'GET');
  }
}

export const apiClient = new ApiClient();
