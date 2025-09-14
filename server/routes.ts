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

  const httpServer = createServer(app);

  return httpServer;
}
