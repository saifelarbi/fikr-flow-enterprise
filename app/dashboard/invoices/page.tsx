'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
          <p className="text-slate-400">Track buying and selling invoices</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Create Invoice
        </Button>
      </div>

      {/* Placeholder */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="h-16 w-16 text-slate-600 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Invoices Yet</h2>
          <p className="text-slate-400 mb-4 text-center">
            Create your first invoice to start tracking business transactions
          </p>
          <Button>
            <Plus size={18} className="mr-2" />
            Create First Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
