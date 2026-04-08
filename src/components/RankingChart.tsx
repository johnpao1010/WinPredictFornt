import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface RankingData {
  name: string;
  pts: number;
  isCurrentUser?: boolean;
}

interface RankingChartProps {
  data: RankingData[];
}

export const RankingChart: React.FC<RankingChartProps> = ({ data }) => {
  // Tomamos solo los top 5 para la gráfica para que no se vea saturada
  const chartData = data.slice(0, 5).map(item => ({
    ...item,
    shortName: item.name.split(' ')[0] // Usamos solo el primer nombre para el eje X
  }));

  return (
    <div className="h-64 w-full mt-4 mb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="shortName" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#f5f3ff' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="pts" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isCurrentUser ? '#fbbf24' : '#4c1d95'} // amber-400 para el usuario actual, violet-900 para los demás
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
