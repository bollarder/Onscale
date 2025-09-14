import { users, dashboardMetrics, chartData, orders, inventory, type User, type InsertUser, type DashboardMetric, type InsertDashboardMetric, type ChartData, type InsertChartData, type Order, type InsertOrder, type Inventory, type InsertInventory } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, sql } from "drizzle-orm";
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


// DatabaseStorage implementation replacing MemStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getDashboardMetrics(section: string): Promise<DashboardMetric[]> {
    const metrics = await db.select().from(dashboardMetrics).where(eq(dashboardMetrics.section, section));
    return metrics;
  }

  async getChartData(section: string, chartId?: string): Promise<ChartData[]> {
    const charts = await db.select().from(chartData).where(
      chartId ? 
        sql`${chartData.section} = ${section} AND ${chartData.chartId} = ${chartId}` :
        eq(chartData.section, section)
    );
    return charts;
  }

  async getOrders(filter?: { status?: string; search?: string; channel?: string; limit?: number; offset?: number }): Promise<{ items: Order[]; totalCount: number }> {
    let whereConditions = [];
    
    if (filter?.status) {
      whereConditions.push(eq(orders.status, filter.status));
    }
    
    if (filter?.search) {
      const searchTerm = `%${filter.search}%`;
      whereConditions.push(
        sql`(${ilike(orders.orderNumber, searchTerm)} OR ${ilike(orders.customerName, searchTerm)} OR ${ilike(orders.productName, searchTerm)})`
      );
    }
    
    if (filter?.channel) {
      whereConditions.push(eq(orders.channel, filter.channel));
    }
    
    const whereClause = whereConditions.length > 0 ? sql`${sql.join(whereConditions, sql` AND `)}` : undefined;
    
    // Get total count
    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(orders).where(whereClause);
    
    // Get paginated results
    const items = await db.select().from(orders)
      .where(whereClause)
      .orderBy(sql`${orders.orderDate} DESC`)
      .limit(filter?.limit || 50)
      .offset(filter?.offset || 0);
    
    return { items, totalCount: Number(count) };
  }

  async getInventoryAlerts(): Promise<Inventory[]> {
    const alerts = await db.select().from(inventory)
      .where(sql`${inventory.currentStock} <= ${inventory.minStock}`);
    return alerts;
  }

  async getOrderStatusCounts(): Promise<{ status: string; count: number; change?: string }[]> {
    const counts = await db.select({
      status: orders.status,
      count: sql<number>`count(*)`
    })
    .from(orders)
    .groupBy(orders.status);
    
    // Add default statuses with mock change data
    const statusMap = new Map(counts.map(c => [c.status, c.count]));
    
    return [
      { status: "New", count: statusMap.get("New") || 0, change: "+12%" },
      { status: "Preparing", count: statusMap.get("Preparing") || 0, change: "+8%" },
      { status: "Shipping", count: statusMap.get("Shipping") || 0, change: "+15%" },
      { status: "Delivered", count: statusMap.get("Delivered") || 0, change: "+22%" },
    ];
  }

  // Method to seed initial data when needed
  async seedData() {
    // Check if data already exists
    const existingMetrics = await db.select().from(dashboardMetrics).limit(1);
    if (existingMetrics.length > 0) return;

    // Seed dashboard metrics
    const metricsData = [
      // Dashboard metrics
      { section: "dashboard", metricName: "totalRevenue", value: "$2.4M", change: "+12.3%", period: "monthly" },
      { section: "dashboard", metricName: "activeCustomers", value: "45,231", change: "+8.1%", period: "monthly" },
      { section: "dashboard", metricName: "totalOrders", value: "12,847", change: "+15.7%", period: "monthly" },
      { section: "dashboard", metricName: "conversionRate", value: "3.24%", change: "-0.5%", period: "monthly" },
      
      // E-commerce metrics
      { section: "ecommerce", metricName: "monthlySales", value: "$1.8M", change: "+18.2%", period: "monthly" },
      { section: "ecommerce", metricName: "ordersProcessed", value: "8,942", change: "+12.4%", period: "monthly" },
      { section: "ecommerce", metricName: "averageOrderValue", value: "$201.32", change: "+5.8%", period: "monthly" },
      
      // Advertising metrics
      { section: "advertising", metricName: "totalImpressions", value: "2.4M", change: "+18.2%", period: "monthly" },
      { section: "advertising", metricName: "clickThroughRate", value: "3.24%", change: "+0.8%", period: "monthly" },
      { section: "advertising", metricName: "costPerClick", value: "$0.82", change: "+5.1%", period: "monthly" },
      { section: "advertising", metricName: "roas", value: "4.2x", change: "+12.5%", period: "monthly" },
      
      // Cash flow metrics
      { section: "cashflow", metricName: "cashInflow", value: "$847K", change: "+15.3%", period: "monthly" },
      { section: "cashflow", metricName: "cashOutflow", value: "$624K", change: "+8.7%", period: "monthly" },
      { section: "cashflow", metricName: "netCashFlow", value: "$223K", change: "+28.1%", period: "monthly" },
      
      // Customer service metrics
      { section: "customer-service", metricName: "customerSatisfaction", value: "4.8/5", change: "+0.3", period: "monthly" },
      { section: "customer-service", metricName: "avgResponseTime", value: "2.3h", change: "-0.5h", period: "monthly" },
      { section: "customer-service", metricName: "openTickets", value: "127", change: "+23", period: "weekly" },
      { section: "customer-service", metricName: "resolutionRate", value: "94.2%", change: "+2.1%", period: "monthly" },
      
      // Customer analytics metrics
      { section: "customer-analytics", metricName: "newCustomers", value: "1,247", change: "+18.2%", period: "monthly" },
      { section: "customer-analytics", metricName: "customerRetention", value: "87.3%", change: "+3.1%", period: "monthly" },
      { section: "customer-analytics", metricName: "avgOrderValue", value: "$187", change: "+12.4%", period: "monthly" },
      { section: "customer-analytics", metricName: "customerLifetimeValue", value: "$2,347", change: "+8.7%", period: "monthly" },
      
      // Growth metrics
      { section: "growth", metricName: "monthlyGrowthRate", value: "12.3%", change: "+2.1%", period: "monthly" },
      { section: "growth", metricName: "marketShare", value: "23.7%", change: "+1.4%", period: "quarterly" },
      { section: "growth", metricName: "revenueGrowth", value: "28.4%", change: "+5.2%", period: "quarterly" },
    ];

    await db.insert(dashboardMetrics).values(metricsData);

    // Seed chart data
    const chartsData = [
      {
        chartId: "revenueChart",
        section: "dashboard",
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue',
            data: [180000, 220000, 280000, 260000, 320000, 380000, 420000, 380000, 450000, 480000, 520000, 580000]
          }]
        }
      },
      {
        chartId: "performanceChart",
        section: "dashboard",
        data: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          datasets: [{
            data: [45, 35, 20]
          }]
        }
      },
      {
        chartId: "salesChart",
        section: "ecommerce",
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales',
            data: [120000, 150000, 180000, 160000, 200000, 240000]
          }]
        }
      }
    ];

    await db.insert(chartData).values(chartsData);

    // Seed orders data
    const ordersData = [
      { orderNumber: "ORD-001", customerId: "C001", customerName: "John Smith", customerEmail: "john@example.com", productName: "Smart Watch Pro", quantity: 2, amount: "599.98", status: "New", channel: "Website" },
      { orderNumber: "ORD-002", customerId: "C002", customerName: "Sarah Johnson", customerEmail: "sarah@example.com", productName: "Wireless Headphones", quantity: 1, amount: "199.99", status: "Preparing", channel: "Mobile App" },
      { orderNumber: "ORD-003", customerId: "C003", customerName: "Mike Wilson", customerEmail: "mike@example.com", productName: "Gaming Laptop", quantity: 1, amount: "1299.99", status: "Shipping", channel: "Website" },
      { orderNumber: "ORD-004", customerId: "C004", customerName: "Emily Davis", customerEmail: "emily@example.com", productName: "Smartphone", quantity: 1, amount: "899.99", status: "Delivered", channel: "Mobile App" },
      { orderNumber: "ORD-005", customerId: "C005", customerName: "David Brown", customerEmail: "david@example.com", productName: "Tablet", quantity: 1, amount: "499.99", status: "New", channel: "Amazon" },
      { orderNumber: "ORD-006", customerId: "C006", customerName: "Lisa Wang", customerEmail: "lisa@example.com", productName: "Bluetooth Speaker", quantity: 3, amount: "179.97", status: "Preparing", channel: "Website" },
      { orderNumber: "ORD-007", customerId: "C007", customerName: "Tom Anderson", customerEmail: "tom@example.com", productName: "Fitness Tracker", quantity: 2, amount: "398.00", status: "Shipping", channel: "eBay" },
      { orderNumber: "ORD-008", customerId: "C008", customerName: "Anna Clark", customerEmail: "anna@example.com", productName: "Digital Camera", quantity: 1, amount: "699.99", status: "Delivered", channel: "Website" },
    ];

    await db.insert(orders).values(ordersData);

    // Seed inventory data
    const inventoryData = [
      { sku: "SW-001", productName: "Smart Watch Pro", currentStock: 5, minStock: 10, maxStock: 100, unitPrice: "299.99", category: "Electronics" },
      { sku: "WH-002", productName: "Wireless Headphones", currentStock: 25, minStock: 15, maxStock: 80, unitPrice: "199.99", category: "Electronics" },
      { sku: "GL-003", productName: "Gaming Laptop", currentStock: 3, minStock: 5, maxStock: 20, unitPrice: "1299.99", category: "Computers" },
      { sku: "SP-004", productName: "Smartphone", currentStock: 8, minStock: 10, maxStock: 50, unitPrice: "899.99", category: "Electronics" },
      { sku: "TB-005", productName: "Tablet", currentStock: 15, minStock: 8, maxStock: 40, unitPrice: "499.99", category: "Electronics" },
      { sku: "BS-006", productName: "Bluetooth Speaker", currentStock: 2, minStock: 12, maxStock: 60, unitPrice: "59.99", category: "Audio" },
      { sku: "FT-007", productName: "Fitness Tracker", currentStock: 20, minStock: 8, maxStock: 35, unitPrice: "199.00", category: "Wearables" },
      { sku: "DC-008", productName: "Digital Camera", currentStock: 7, minStock: 6, maxStock: 25, unitPrice: "699.99", category: "Photography" },
    ];

    await db.insert(inventory).values(inventoryData);
  }
}

export const storage = new DatabaseStorage();

// Initialize data on startup
storage.seedData().catch(console.error);
