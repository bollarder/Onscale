import { type User, type InsertUser, type DashboardMetric, type InsertDashboardMetric, type ChartData, type InsertChartData, type Order, type InsertOrder, type Inventory, type InsertInventory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getDashboardMetrics(section: string): Promise<DashboardMetric[]>;
  getChartData(section: string, chartId?: string): Promise<ChartData[]>;
  getOrders(filter?: { status?: string; search?: string; channel?: string; limit?: number; offset?: number }): Promise<{ items: Order[]; totalCount: number }>;
  getInventoryAlerts(): Promise<Inventory[]>;
  getOrderStatusCounts(): Promise<{ status: string; count: number; change?: string }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dashboardMetrics: Map<string, DashboardMetric>;
  private chartData: Map<string, ChartData>;
  private orders: Map<string, Order>;
  private inventory: Map<string, Inventory>;

  constructor() {
    this.users = new Map();
    this.dashboardMetrics = new Map();
    this.chartData = new Map();
    this.orders = new Map();
    this.inventory = new Map();
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

    // Seed orders data
    const ordersData: Order[] = [
      { id: randomUUID(), orderNumber: "ORD-001", customerId: "C001", customerName: "John Smith", customerEmail: "john@example.com", productName: "Smart Watch Pro", quantity: 2, amount: "599.98", status: "New", channel: "Website", orderDate: new Date(Date.now() - 1000 * 60 * 30), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-002", customerId: "C002", customerName: "Sarah Johnson", customerEmail: "sarah@example.com", productName: "Wireless Headphones", quantity: 1, amount: "199.99", status: "Preparing", channel: "Mobile App", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 2), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-003", customerId: "C003", customerName: "Mike Wilson", customerEmail: "mike@example.com", productName: "Gaming Laptop", quantity: 1, amount: "1299.99", status: "Shipping", channel: "Website", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-004", customerId: "C004", customerName: "Emily Davis", customerEmail: "emily@example.com", productName: "Smartphone", quantity: 1, amount: "899.99", status: "Delivered", channel: "Mobile App", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 48), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-005", customerId: "C005", customerName: "David Brown", customerEmail: "david@example.com", productName: "Tablet", quantity: 1, amount: "499.99", status: "New", channel: "Amazon", orderDate: new Date(Date.now() - 1000 * 60 * 15), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-006", customerId: "C006", customerName: "Lisa Wang", customerEmail: "lisa@example.com", productName: "Bluetooth Speaker", quantity: 3, amount: "179.97", status: "Preparing", channel: "Website", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 4), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-007", customerId: "C007", customerName: "Tom Anderson", customerEmail: "tom@example.com", productName: "Fitness Tracker", quantity: 2, amount: "398.00", status: "Shipping", channel: "eBay", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 36), updatedAt: new Date() },
      { id: randomUUID(), orderNumber: "ORD-008", customerId: "C008", customerName: "Anna Clark", customerEmail: "anna@example.com", productName: "Digital Camera", quantity: 1, amount: "699.99", status: "Delivered", channel: "Website", orderDate: new Date(Date.now() - 1000 * 60 * 60 * 72), updatedAt: new Date() },
    ];

    ordersData.forEach(order => {
      this.orders.set(order.id, order);
    });

    // Seed inventory data
    const inventoryData: Inventory[] = [
      { id: randomUUID(), sku: "SW-001", productName: "Smart Watch Pro", currentStock: 5, minStock: 10, maxStock: 100, unitPrice: "299.99", category: "Electronics", updatedAt: new Date() },
      { id: randomUUID(), sku: "WH-002", productName: "Wireless Headphones", currentStock: 25, minStock: 15, maxStock: 80, unitPrice: "199.99", category: "Electronics", updatedAt: new Date() },
      { id: randomUUID(), sku: "GL-003", productName: "Gaming Laptop", currentStock: 3, minStock: 5, maxStock: 20, unitPrice: "1299.99", category: "Computers", updatedAt: new Date() },
      { id: randomUUID(), sku: "SP-004", productName: "Smartphone", currentStock: 8, minStock: 10, maxStock: 50, unitPrice: "899.99", category: "Electronics", updatedAt: new Date() },
      { id: randomUUID(), sku: "TB-005", productName: "Tablet", currentStock: 15, minStock: 8, maxStock: 40, unitPrice: "499.99", category: "Electronics", updatedAt: new Date() },
      { id: randomUUID(), sku: "BS-006", productName: "Bluetooth Speaker", currentStock: 2, minStock: 12, maxStock: 60, unitPrice: "59.99", category: "Audio", updatedAt: new Date() },
      { id: randomUUID(), sku: "FT-007", productName: "Fitness Tracker", currentStock: 20, minStock: 8, maxStock: 35, unitPrice: "199.00", category: "Wearables", updatedAt: new Date() },
      { id: randomUUID(), sku: "DC-008", productName: "Digital Camera", currentStock: 7, minStock: 6, maxStock: 25, unitPrice: "699.99", category: "Photography", updatedAt: new Date() },
    ];

    inventoryData.forEach(item => {
      this.inventory.set(item.id, item);
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

  async getOrders(filter?: { status?: string; search?: string; channel?: string; limit?: number; offset?: number }): Promise<{ items: Order[]; totalCount: number }> {
    let orders = Array.from(this.orders.values());
    
    // Apply status filter
    if (filter?.status) {
      orders = orders.filter(order => order.status === filter.status);
    }
    
    // Apply search filter (order number, customer name, product name)
    if (filter?.search) {
      const searchTerm = filter.search.toLowerCase();
      orders = orders.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm) ||
        order.productName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply channel filter
    if (filter?.channel) {
      orders = orders.filter(order => order.channel === filter.channel);
    }
    
    // Sort by order date (newest first)
    orders.sort((a, b) => {
      const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
      const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
      return dateB - dateA;
    });
    
    const totalCount = orders.length;
    const offset = filter?.offset || 0;
    const limit = filter?.limit || 50;
    
    const items = orders.slice(offset, offset + limit);
    
    return { items, totalCount };
  }

  async getInventoryAlerts(): Promise<Inventory[]> {
    return Array.from(this.inventory.values()).filter(
      item => item.currentStock <= item.minStock
    );
  }

  async getOrderStatusCounts(): Promise<{ status: string; count: number; change?: string }[]> {
    const orders = Array.from(this.orders.values());
    const statusCounts = new Map<string, number>();
    
    orders.forEach(order => {
      const count = statusCounts.get(order.status) || 0;
      statusCounts.set(order.status, count + 1);
    });
    
    return [
      { status: "New", count: statusCounts.get("New") || 0, change: "+12%" },
      { status: "Preparing", count: statusCounts.get("Preparing") || 0, change: "+8%" },
      { status: "Shipping", count: statusCounts.get("Shipping") || 0, change: "+15%" },
      { status: "Delivered", count: statusCounts.get("Delivered") || 0, change: "+22%" },
    ];
  }
}

export const storage = new MemStorage();
