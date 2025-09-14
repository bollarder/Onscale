import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface InteractiveChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'pie' | 'scatter';
  data: any;
  options?: any;
  className?: string;
  testId?: string;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#0f172a'
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#0f172a',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: {
        size: 14,
        weight: '600' as const,
        family: 'Inter'
      },
      bodyFont: {
        size: 13,
        family: 'Inter'
      }
    },
  },
  scales: {
    x: {
      grid: {
        color: '#e2e8f0',
        drawBorder: false,
      },
      ticks: {
        color: '#64748b',
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    },
    y: {
      grid: {
        color: '#e2e8f0',
        drawBorder: false,
      },
      ticks: {
        color: '#64748b',
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#0f172a'
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#0f172a',
      bodyColor: '#0f172a',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
};

// Error boundary component to catch Chart.js errors
interface ChartErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ChartErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ChartErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    // Check if error is Chart.js related
    const isChartError = error.message?.includes('ownerDocument') || 
                        error.message?.includes('Chart') ||
                        error.message?.includes('canvas') ||
                        error.stack?.includes('chart.js') ||
                        error.stack?.includes('chartjs');
    
    if (isChartError) {
      return { hasError: true, error };
    }
    
    // Re-throw non-Chart errors to be handled by parent error boundaries
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log Chart.js related errors to avoid noise
    const isChartError = error.message?.includes('ownerDocument') || 
                        error.message?.includes('Chart') ||
                        error.message?.includes('canvas') ||
                        error.stack?.includes('chart.js') ||
                        error.stack?.includes('chartjs');
    
    if (isChartError) {
      console.warn('Chart.js rendering error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          Chart unavailable
        </div>
      );
    }

    return this.props.children;
  }
}

export function InteractiveChart({ type, data, options, className = '', testId }: InteractiveChartProps) {
  const chartRef = useRef<ChartJS | null>(null);
  const [mounted, setMounted] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  // Force re-render on hot reload
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Handle hot module replacement
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        setChartKey(prev => prev + 1);
      });
    }
  }, []);

  const chartOptions = {
    ...(type === 'doughnut' || type === 'pie' ? doughnutOptions : defaultOptions),
    ...options,
  };

  // Apply theme-aware colors to datasets
  const processedData = {
    ...data,
    datasets: data.datasets?.map((dataset: any) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: dataset.borderColor || '#e2e8f0',
      borderWidth: dataset.borderWidth || (type === 'line' ? 2 : 1),
      fill: dataset.fill !== undefined ? dataset.fill : false,
      tension: dataset.tension || (type === 'line' ? 0.3 : 0),
    }))
  };

  // Generate backward-compatible canvas test ID for actual canvas element
  const legacyCanvasId = testId ? `canvas-${testId.replace('chart-', '').replace('-interactive', '')}-chart` : undefined;

  // Apply test ID to canvas element after chart is mounted
  useEffect(() => {
    if (chartRef.current && legacyCanvasId) {
      const canvas = chartRef.current.canvas;
      if (canvas) {
        canvas.setAttribute('data-testid', legacyCanvasId);
      }
    }
  }, [legacyCanvasId, chartKey]);

  if (!mounted) {
    return (
      <div className={`w-full h-[300px] ${className} flex items-center justify-center`} data-testid={testId}>
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <ChartErrorBoundary>
      <div 
        className={`w-full h-[300px] ${className}`} 
        data-testid={testId}
      >
        <Chart
          key={chartKey}
          ref={chartRef}
          type={type}
          data={processedData}
          options={chartOptions}
        />
      </div>
    </ChartErrorBoundary>
  );
}