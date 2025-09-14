import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/kpi-card";
import { ChartCard } from "@/components/chart-card";
import { InteractiveChart } from "@/components/interactive-chart";
import { Wallet, TrendingUp, AlertTriangle, Filter, Calendar, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

export default function CashFlow() {
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("week");

  // 6-month cash flow forecast data
  const forecastData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Income',
        data: [45000000, 48000000, 46000000, 52000000, 49000000, 51000000],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: [38000000, 41000000, 39000000, 43000000, 42000000, 44000000],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.3
      }
    ]
  };

  // Income sources data
  const incomeSourcesData = {
    labels: ['Product Sales', 'Subscriptions', 'Partnerships', 'Investments', 'Other'],
    datasets: [{
      data: [65, 20, 8, 5, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ]
    }]
  };

  // Expense categories data
  const expenseCategoriesData = {
    labels: ['Operations', 'Marketing', 'Salaries', 'Technology', 'Legal', 'Other'],
    datasets: [{
      data: [35, 25, 20, 12, 5, 3],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ]
    }]
  };

  // Recent transactions data
  const transactions = [
    { id: 1, date: '2025-09-14', type: 'income', amount: 2500000, description: 'Product Sales Revenue', category: 'Sales', status: 'completed' },
    { id: 2, date: '2025-09-13', type: 'expense', amount: -850000, description: 'Marketing Campaign', category: 'Marketing', status: 'completed' },
    { id: 3, date: '2025-09-13', type: 'income', amount: 1200000, description: 'Subscription Revenue', category: 'Subscriptions', status: 'completed' },
    { id: 4, date: '2025-09-12', type: 'expense', amount: -3200000, description: 'Salary Payments', category: 'Salaries', status: 'completed' },
    { id: 5, date: '2025-09-11', type: 'expense', amount: -450000, description: 'Office Rent', category: 'Operations', status: 'completed' },
    { id: 6, date: '2025-09-10', type: 'income', amount: 800000, description: 'Partnership Revenue', category: 'Partnerships', status: 'pending' },
    { id: 7, date: '2025-09-09', type: 'expense', amount: -680000, description: 'Cloud Infrastructure', category: 'Technology', status: 'completed' },
    { id: 8, date: '2025-09-08', type: 'income', amount: 1800000, description: 'Investment Income', category: 'Investments', status: 'completed' },
  ];

  // Date filtering helper functions
  const getDateRange = (filter: string) => {
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    switch (filter) {
      case 'week': {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
        return { start: startOfWeek, end: endOfWeek };
      }
      case 'month': {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return { start: startOfMonth, end: endOfMonth };
      }
      case 'quarter': {
        const currentQuarter = Math.floor(currentDate.getMonth() / 3);
        const startOfQuarter = new Date(currentDate.getFullYear(), currentQuarter * 3, 1);
        const endOfQuarter = new Date(currentDate.getFullYear(), (currentQuarter + 1) * 3, 0);
        return { start: startOfQuarter, end: endOfQuarter };
      }
      default:
        return { start: new Date(0), end: new Date() };
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by transaction type
    const typeMatch = transactionFilter === 'all' || transaction.type === transactionFilter;
    
    // Filter by time period
    const transactionDate = new Date(transaction.date);
    const { start, end } = getDateRange(timeFilter);
    const dateMatch = transactionDate >= start && transactionDate <= end;
    
    return typeMatch && dateMatch;
  });

  // Alerts data
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Cash Alert',
      message: 'Available cash below 6-month threshold',
      severity: 'medium',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Unusual Spending Pattern',
      message: 'Marketing expenses 40% higher than last month',
      severity: 'low',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Revenue Target Met',
      message: 'Monthly revenue goal achieved 5 days early',
      severity: 'low',
      timestamp: '3 days ago'
    }
  ];

  const formatCurrency = (amount: number) => {
    return `₩${(amount / 1000000).toFixed(0)}M`;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'info': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'success': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Current Cash"
          value="₩180M"
          change="+5.2%"
          icon={<Wallet className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-500/10"
          progress={85}
          progressColor="bg-blue-500"
          testId="kpi-current-cash"
        />
        
        <KPICard
          title="Available Cash"
          value="₩165M"
          change="+3.8%"
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
          progress={78}
          progressColor="bg-green-500"
          testId="kpi-available-cash"
        />
        
        <KPICard
          title="Runway"
          value="4.0 months"
          change="-0.2 months"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-500/10"
          progress={40}
          progressColor="bg-amber-500"
          testId="kpi-runway"
        />
      </div>

      {/* Main Chart and Side Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Forecast Chart */}
        <ChartCard
          title="6-Month Cash Flow Forecast"
          hasFilter={true}
          className="lg:col-span-2"
          testId="chart-cash-flow-forecast"
        >
          <InteractiveChart
            type="line"
            data={forecastData}
            options={{
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    callback: function(value: any) {
                      return '₩' + (value / 1000000) + 'M';
                    }
                  }
                }
              }
            }}
            testId="chart-forecast"
          />
        </ChartCard>

        {/* Income Sources */}
        <ChartCard
          title="Income Sources"
          testId="chart-income-sources"
        >
          <InteractiveChart
            type="doughnut"
            data={incomeSourcesData}
            testId="chart-income"
          />
        </ChartCard>
      </div>

      {/* Expense Categories and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Categories */}
        <ChartCard
          title="Expense Categories"
          testId="chart-expense-categories"
        >
          <InteractiveChart
            type="doughnut"
            data={expenseCategoriesData}
            testId="chart-expenses"
          />
        </ChartCard>

        {/* Alerts */}
        <Card className="lg:col-span-2" data-testid="card-alerts">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="text-alerts-title">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-background rounded-lg border" data-testid={`alert-${alert.id}`}>
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground" data-testid={`alert-title-${alert.id}`}>
                        {alert.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={alert.severity === 'medium' ? 'destructive' : alert.severity === 'low' ? 'secondary' : 'default'}
                          data-testid={`alert-severity-${alert.id}`}
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground" data-testid={`alert-time-${alert.id}`}>
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1" data-testid={`alert-message-${alert.id}`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card data-testid="card-transactions">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle data-testid="text-transactions-title">Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32" data-testid="select-time-filter">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-32" data-testid="select-transaction-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-transactions">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50" data-testid={`transaction-${transaction.id}`}>
                    <td className="py-3 px-4 text-sm text-foreground" data-testid={`transaction-date-${transaction.id}`}>
                      {transaction.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm capitalize ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`} data-testid={`transaction-type-${transaction.id}`}>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground" data-testid={`transaction-description-${transaction.id}`}>
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground" data-testid={`transaction-category-${transaction.id}`}>
                      {transaction.category}
                    </td>
                    <td className={`py-3 px-4 text-sm text-right font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`} data-testid={`transaction-amount-${transaction.id}`}>
                      {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        variant={transaction.status === 'completed' ? 'secondary' : 'outline'}
                        data-testid={`transaction-status-${transaction.id}`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}