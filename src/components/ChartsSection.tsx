import { Card } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useState } from "react";
import { useFilters } from "../lib/FilterContext";
import { generateRevenueData, generateAttendanceData } from "../lib/mockData";

export function ChartsSection() {
  const [showCharts, setShowCharts] = useState(true);
  const { filters } = useFilters();
  
  const revenueData = generateRevenueData(filters);
  const attendanceData = generateAttendanceData(filters);

  return (
    <div className="space-y-4">
      {/* Mobile toggle button */}
      <Button 
        onClick={() => setShowCharts(!showCharts)}
        variant="outline"
        className="w-full lg:hidden rounded-xl border-gray-200"
      >
        {showCharts ? 'Hide' : 'View'} Trends
        <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${showCharts ? 'rotate-90' : ''}`} />
      </Button>

      <motion.div 
        initial={{ height: showCharts ? 'auto' : 0 }}
        animate={{ height: showCharts ? 'auto' : 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 overflow-hidden"
      >
        {/* Revenue Trend Chart */}
        <Card className="p-4 md:p-6 rounded-2xl border-gray-100">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#003C78]" />
            <h2 className="text-gray-900">Revenue Trend</h2>
            <span className="text-xs md:text-sm text-gray-500 ml-auto">Last 30 Days</span>
          </div>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                className="md:text-xs"
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                className="md:text-xs"
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`€${value}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#003C78" 
                strokeWidth={3}
                dot={{ fill: '#003C78', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance Trend Chart */}
        <Card className="p-4 md:p-6 rounded-2xl border-gray-100">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-[#00A859]" />
            <h2 className="text-gray-900">Attendance Trend</h2>
            <span className="text-xs md:text-sm text-gray-500 ml-auto">Last 7 Days</span>
          </div>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                className="md:text-xs"
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                className="md:text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`${value}%`, 'Attendance']}
              />
              <Bar 
                dataKey="attendance" 
                fill="#BFFF00" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}
