import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  hasFilter?: boolean;
  filterOptions?: string[];
  className?: string;
  testId?: string;
}

export function ChartCard({
  title,
  children,
  hasFilter = false,
  filterOptions = ["Last 30 days", "Last 90 days", "Last year"],
  className = "",
  testId
}: ChartCardProps) {
  return (
    <Card className={className} data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground" data-testid={`text-${testId}-title`}>
            {title}
          </CardTitle>
          {hasFilter && (
            <Select defaultValue={filterOptions[0]} data-testid={`select-${testId}-filter`}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
