import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  progress?: number;
  progressColor?: string;
  testId?: string;
}

export function KPICard({
  title,
  value,
  change,
  icon,
  iconBgColor = "bg-primary/10",
  progress,
  progressColor = "bg-primary",
  testId
}: KPICardProps) {
  const isPositive = change && change.startsWith("+");
  const isNegative = change && change.startsWith("-");

  return (
    <Card data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground" data-testid={`text-${testId}-title`}>{title}</p>
              <p className="text-2xl font-bold text-foreground" data-testid={`text-${testId}-value`}>{value}</p>
            </div>
          </div>
          {change && (
            <div className={`flex items-center text-sm ${
              isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-muted-foreground"
            }`} data-testid={`text-${testId}-change`}>
              {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
              {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        {progress !== undefined && (
          <div className="w-full bg-muted rounded-full h-2">
            <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
