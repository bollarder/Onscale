import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const dashboardMetrics = pgTable("dashboard_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: varchar("section", { length: 50 }).notNull(),
  metricName: varchar("metric_name", { length: 100 }).notNull(),
  value: text("value").notNull(),
  change: text("change"),
  period: varchar("period", { length: 50 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chartData = pgTable("chart_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chartId: varchar("chart_id", { length: 100 }).notNull(),
  section: varchar("section", { length: 50 }).notNull(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDashboardMetricsSchema = createInsertSchema(dashboardMetrics).omit({
  id: true,
  updatedAt: true,
});

export const insertChartDataSchema = createInsertSchema(chartData).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DashboardMetric = typeof dashboardMetrics.$inferSelect;
export type InsertDashboardMetric = z.infer<typeof insertDashboardMetricsSchema>;
export type ChartData = typeof chartData.$inferSelect;
export type InsertChartData = z.infer<typeof insertChartDataSchema>;
