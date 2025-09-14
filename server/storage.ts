import { type User, type InsertUser, type DashboardMetric, type InsertDashboardMetric, type ChartData, type InsertChartData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getDashboardMetrics(section: string): Promise<DashboardMetric[]>;
  getChartData(section: string, chartId?: string): Promise<ChartData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dashboardMetrics: Map<string, DashboardMetric>;
  private chartData: Map<string, ChartData>;

  constructor() {
    this.users = new Map();
    this.dashboardMetrics = new Map();
    this.chartData = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed dashboard metrics
    const metrics: DashboardMetric[] = [
      // Dashboard metrics
      { id: randomUUID(), section: "dashboard", metricName: "totalRevenue", value: "$2.4M", change: "+12.3%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "dashboard", metricName: "activeCustomers", value: "45,231", change: "+8.1%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "dashboard", metricName: "totalOrders", value: "12,847", change: "+15.7%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "dashboard", metricName: "conversionRate", value: "3.24%", change: "-0.5%", period: "monthly", updatedAt: new Date() },
      
      // E-commerce metrics
      { id: randomUUID(), section: "ecommerce", metricName: "monthlySales", value: "$1.8M", change: "+18.2%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "ecommerce", metricName: "ordersProcessed", value: "8,942", change: "+12.4%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "ecommerce", metricName: "averageOrderValue", value: "$201.32", change: "+5.8%", period: "monthly", updatedAt: new Date() },
      
      // Advertising metrics
      { id: randomUUID(), section: "advertising", metricName: "totalImpressions", value: "2.4M", change: "+18.2%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "advertising", metricName: "clickThroughRate", value: "3.24%", change: "+0.8%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "advertising", metricName: "costPerClick", value: "$0.82", change: "+5.1%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "advertising", metricName: "roas", value: "4.2x", change: "+12.5%", period: "monthly", updatedAt: new Date() },
      
      // Cash flow metrics
      { id: randomUUID(), section: "cashflow", metricName: "cashInflow", value: "$847K", change: "+15.3%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "cashflow", metricName: "cashOutflow", value: "$624K", change: "+8.7%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "cashflow", metricName: "netCashFlow", value: "$223K", change: "+28.1%", period: "monthly", updatedAt: new Date() },
      
      // Customer service metrics
      { id: randomUUID(), section: "customer-service", metricName: "customerSatisfaction", value: "4.8/5", change: "+0.3", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-service", metricName: "avgResponseTime", value: "2.3h", change: "-0.5h", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-service", metricName: "openTickets", value: "127", change: "+23", period: "weekly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-service", metricName: "resolutionRate", value: "94.2%", change: "+2.1%", period: "monthly", updatedAt: new Date() },
      
      // Customer analytics metrics
      { id: randomUUID(), section: "customer-analytics", metricName: "newCustomers", value: "1,247", change: "+18.2%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-analytics", metricName: "customerRetention", value: "87.3%", change: "+3.1%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-analytics", metricName: "avgOrderValue", value: "$187", change: "+12.4%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "customer-analytics", metricName: "customerLifetimeValue", value: "$2,347", change: "+8.7%", period: "monthly", updatedAt: new Date() },
      
      // Growth metrics
      { id: randomUUID(), section: "growth", metricName: "monthlyGrowthRate", value: "12.3%", change: "+2.1%", period: "monthly", updatedAt: new Date() },
      { id: randomUUID(), section: "growth", metricName: "marketShare", value: "23.7%", change: "+1.4%", period: "quarterly", updatedAt: new Date() },
      { id: randomUUID(), section: "growth", metricName: "revenueGrowth", value: "28.4%", change: "+5.2%", period: "quarterly", updatedAt: new Date() },
    ];

    metrics.forEach(metric => {
      this.dashboardMetrics.set(metric.id, metric);
    });

    // Seed chart data
    const charts: ChartData[] = [
      {
        id: randomUUID(),
        chartId: "revenueChart",
        section: "dashboard",
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue',
            data: [180000, 220000, 280000, 260000, 320000, 380000, 420000, 380000, 450000, 480000, 520000, 580000]
          }]
        },
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        chartId: "performanceChart",
        section: "dashboard",
        data: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          datasets: [{
            data: [45, 35, 20]
          }]
        },
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        chartId: "salesChart",
        section: "ecommerce",
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales',
            data: [120000, 150000, 180000, 160000, 200000, 240000]
          }]
        },
        updatedAt: new Date()
      }
    ];

    charts.forEach(chart => {
      this.chartData.set(chart.id, chart);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDashboardMetrics(section: string): Promise<DashboardMetric[]> {
    return Array.from(this.dashboardMetrics.values()).filter(
      metric => metric.section === section
    );
  }

  async getChartData(section: string, chartId?: string): Promise<ChartData[]> {
    return Array.from(this.chartData.values()).filter(
      chart => chart.section === section && (!chartId || chart.chartId === chartId)
    );
  }
}

export const storage = new MemStorage();
