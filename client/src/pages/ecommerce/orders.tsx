import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  RefreshCw,
  Download,
  Filter,
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Mail,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // API Queries
  const { data: orderStatusCounts, isLoading: statusLoading } = useQuery({
    queryKey: ["/api/orders/status-counts"],
  });

  const { data: ordersResponse, isLoading: ordersLoading } = useQuery({
    queryKey: [
      "/api/orders",
      {
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchTerm || undefined,
        channel: channelFilter === "all" ? undefined : channelFilter,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      },
    ],
  });

  const { data: inventoryAlerts, isLoading: inventoryLoading } = useQuery({
    queryKey: ["/api/inventory/alerts"],
  });

  // Extract server response data
  const orders =
    ordersResponse &&
    typeof ordersResponse === "object" &&
    "items" in ordersResponse
      ? (ordersResponse.items as any[])
      : [];
  const totalOrdersCount =
    ordersResponse &&
    typeof ordersResponse === "object" &&
    "totalCount" in ordersResponse
      ? (ordersResponse.totalCount as number)
      : 0;

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, channelFilter]);

  const getStatusCounts = () => {
    if (!Array.isArray(orderStatusCounts)) {
      return { new: 0, preparing: 0, shipping: 0, delivered: 0 };
    }
    return {
      new: orderStatusCounts.find((s: any) => s.status === "New")?.count || 0,
      preparing:
        orderStatusCounts.find((s: any) => s.status === "Preparing")?.count ||
        0,
      shipping:
        orderStatusCounts.find((s: any) => s.status === "Shipping")?.count || 0,
      delivered:
        orderStatusCounts.find((s: any) => s.status === "Delivered")?.count ||
        0,
    };
  };

  const statusCounts = getStatusCounts();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "preparing":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "shipping":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const exportOrders = () => {
    // Mock export functionality
    const csvContent = orders
      .map(
        (order: any) =>
          `${order.orderNumber},${order.customerName},${order.productName},${order.quantity},${order.amount},${order.status}`,
      )
      .join("\n");
    console.log("Exporting orders:", csvContent);
  };

  if (statusLoading || ordersLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div
            className="flex items-center text-sm text-muted-foreground mb-2"
            data-testid="breadcrumb-orders"
          >
            <Link href="/ecommerce" className="hover:text-foreground">
              이커머스 관리
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">주문 관리</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/ecommerce">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-back-to-hub"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1
              className="text-2xl font-bold text-foreground"
              data-testid="heading-orders"
            >
              주문 관리
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-date-range">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" data-testid="button-refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Order Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card data-testid="card-new-orders">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-new-orders-label"
                  >
                    New Orders
                  </p>
                  <p
                    className="text-2xl font-bold text-foreground"
                    data-testid="text-new-orders-count"
                  >
                    {statusCounts.new}
                  </p>
                  <p
                    className="text-sm text-green-500"
                    data-testid="text-new-orders-change"
                  >
                    +12% vs yesterday
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-preparing-orders">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-preparing-orders-label"
                  >
                    Preparing
                  </p>
                  <p
                    className="text-2xl font-bold text-foreground"
                    data-testid="text-preparing-orders-count"
                  >
                    {statusCounts.preparing}
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-preparing-orders-time"
                  >
                    2.3 hours avg processing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-shipping-orders">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-shipping-orders-label"
                  >
                    Shipping
                  </p>
                  <p
                    className="text-2xl font-bold text-foreground"
                    data-testid="text-shipping-orders-count"
                  >
                    {statusCounts.shipping}
                  </p>
                  <p
                    className="text-sm text-green-500"
                    data-testid="text-shipping-orders-rate"
                  >
                    94% on-time delivery
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-delivered-orders">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-delivered-orders-label"
                  >
                    Delivered
                  </p>
                  <p
                    className="text-2xl font-bold text-foreground"
                    data-testid="text-delivered-orders-count"
                  >
                    {statusCounts.delivered}
                  </p>
                  <p
                    className="text-sm text-green-500"
                    data-testid="text-delivered-orders-rating"
                  >
                    4.2/5 customer rating
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Order Management Table */}
        <div className="lg:col-span-3">
          <Card data-testid="card-order-management">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle
                  className="text-lg font-semibold"
                  data-testid="heading-order-management"
                >
                  Order Management
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportOrders}
                    data-testid="button-export-orders"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="button-bulk-actions"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Bulk Update
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search orders, customers, or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-orders"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  data-testid="select-status-filter"
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Shipping">Shipping</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={channelFilter}
                  onValueChange={setChannelFilter}
                  data-testid="select-channel-filter"
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="eBay">eBay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-orders">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Order ID
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Customer
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Product
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Quantity
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Amount
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Date
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Status
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => (
                      <tr
                        key={order.id}
                        className="border-b border-border"
                        data-testid={`row-order-${order.orderNumber}`}
                      >
                        <td
                          className="py-3 text-sm font-medium text-foreground"
                          data-testid={`text-order-id-${order.orderNumber}`}
                        >
                          {order.orderNumber}
                        </td>
                        <td className="py-3">
                          <div
                            data-testid={`text-customer-${order.customerName.replace(/\s+/g, "-").toLowerCase()}`}
                          >
                            <p className="text-sm font-medium text-foreground">
                              {order.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.customerEmail}
                            </p>
                          </div>
                        </td>
                        <td
                          className="py-3 text-sm text-foreground"
                          data-testid={`text-product-${order.productName.replace(/\s+/g, "-").toLowerCase()}`}
                        >
                          {order.productName}
                        </td>
                        <td
                          className="py-3 text-sm text-foreground"
                          data-testid={`text-quantity-${order.orderNumber}`}
                        >
                          {order.quantity}
                        </td>
                        <td
                          className="py-3 text-sm font-semibold text-foreground"
                          data-testid={`text-amount-${order.orderNumber}`}
                        >
                          ${order.amount}
                        </td>
                        <td
                          className="py-3 text-sm text-muted-foreground"
                          data-testid={`text-date-${order.orderNumber}`}
                        >
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td
                          className="py-3"
                          data-testid={`badge-status-${order.orderNumber}`}
                        >
                          <Badge
                            className={`border ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            data-testid={`button-actions-${order.orderNumber}`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div
                  className="text-sm text-muted-foreground"
                  data-testid="text-pagination-info"
                >
                  Showing{" "}
                  {totalOrdersCount === 0
                    ? 0
                    : (currentPage - 1) * itemsPerPage + 1}{" "}
                  to {Math.min(currentPage * itemsPerPage, totalOrdersCount)} of{" "}
                  {totalOrdersCount} orders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage * itemsPerPage >= totalOrdersCount}
                    data-testid="button-next-page"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
          {/* Inventory Alerts */}
          <Card data-testid="card-inventory-alerts">
            <CardHeader>
              <CardTitle
                className="text-lg font-semibold flex items-center"
                data-testid="heading-inventory-alerts"
              >
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.isArray(inventoryAlerts)
                  ? inventoryAlerts.slice(0, 4).map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-amber-500/5 rounded-lg border border-amber-500/20"
                        data-testid={`alert-${item.sku}`}
                      >
                        <div>
                          <p
                            className="text-sm font-medium text-foreground"
                            data-testid={`text-alert-product-${item.sku}`}
                          >
                            {item.productName}
                          </p>
                          <p
                            className="text-xs text-muted-foreground"
                            data-testid={`text-alert-stock-${item.sku}`}
                          >
                            Stock: {item.currentStock}/{item.minStock}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          data-testid={`button-reorder-${item.sku}`}
                        >
                          Reorder
                        </Button>
                      </div>
                    ))
                  : null}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Performance */}
          <Card data-testid="card-shipping-performance">
            <CardHeader>
              <CardTitle
                className="text-lg font-semibold flex items-center"
                data-testid="heading-shipping-performance"
              >
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Shipping Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between"
                  data-testid="shipping-fedex"
                >
                  <span className="text-sm text-foreground">FedEx</span>
                  <span className="text-sm font-semibold text-green-500">
                    96.2%
                  </span>
                </div>
                <div
                  className="flex items-center justify-between"
                  data-testid="shipping-ups"
                >
                  <span className="text-sm text-foreground">UPS</span>
                  <span className="text-sm font-semibold text-green-500">
                    94.8%
                  </span>
                </div>
                <div
                  className="flex items-center justify-between"
                  data-testid="shipping-dhl"
                >
                  <span className="text-sm text-foreground">DHL</span>
                  <span className="text-sm font-semibold text-yellow-500">
                    91.3%
                  </span>
                </div>
                <div
                  className="flex items-center justify-between"
                  data-testid="shipping-usps"
                >
                  <span className="text-sm text-foreground">USPS</span>
                  <span className="text-sm font-semibold text-red-500">
                    87.1%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card data-testid="card-top-products">
            <CardHeader>
              <CardTitle
                className="text-lg font-semibold"
                data-testid="heading-top-products"
              >
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between"
                  data-testid="top-product-1"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Smart Watch Pro
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stock: 5 units
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">$284K</p>
                </div>
                <div
                  className="flex items-center justify-between"
                  data-testid="top-product-2"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Gaming Laptop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stock: 3 units
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">$178K</p>
                </div>
                <div
                  className="flex items-center justify-between"
                  data-testid="top-product-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Wireless Headphones
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stock: 25 units
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">$192K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card data-testid="card-quick-actions">
            <CardHeader>
              <CardTitle
                className="text-lg font-semibold"
                data-testid="heading-quick-actions"
              >
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-generate-labels"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Generate Shipping Labels
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-communication-templates"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Communication Templates
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-inventory-report"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Inventory Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
