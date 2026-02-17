'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Expenses</h1>
          <p className="text-slate-400">Track business expenses</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Log Expense
        </Button>
      </div>

      {/* Placeholder */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <DollarSign className="h-16 w-16 text-slate-600 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Expenses Yet</h2>
          <p className="text-slate-400 mb-4 text-center">
            Start tracking business expenses to monitor spending and profitability
          </p>
          <Button>
            <Plus size={18} className="mr-2" />
            Log First Expense
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
