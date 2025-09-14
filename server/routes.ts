import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get dashboard metrics for a specific section
  app.get("/api/metrics/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const metrics = await storage.getDashboardMetrics(section);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Get chart data for a specific section
  app.get("/api/charts/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const { chartId } = req.query;
      const chartData = await storage.getChartData(section, chartId as string);
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chart data" });
    }
  });

  // Get orders with optional filtering
  app.get("/api/orders", async (req, res) => {
    try {
      const { status, search, channel, limit, offset } = req.query;
      const filter = {
        status: status as string,
        search: search as string,
        channel: channel as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };
      const result = await storage.getOrders(filter);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get inventory alerts
  app.get("/api/inventory/alerts", async (req, res) => {
    try {
      const alerts = await storage.getInventoryAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inventory alerts" });
    }
  });

  // Get order status counts
  app.get("/api/orders/status-counts", async (req, res) => {
    try {
      const statusCounts = await storage.getOrderStatusCounts();
      res.json(statusCounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order status counts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
