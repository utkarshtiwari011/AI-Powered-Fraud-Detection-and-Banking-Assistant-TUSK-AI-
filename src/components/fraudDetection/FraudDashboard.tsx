
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Sample data for charts
const transactionData = [
  { name: '12AM', normal: 120, suspicious: 5 },
  { name: '3AM', normal: 60, suspicious: 12 },
  { name: '6AM', normal: 180, suspicious: 8 },
  { name: '9AM', normal: 340, suspicious: 15 },
  { name: '12PM', normal: 410, suspicious: 20 },
  { name: '3PM', normal: 380, suspicious: 18 },
  { name: '6PM', normal: 420, suspicious: 25 },
  { name: '9PM', normal: 220, suspicious: 14 },
];

const riskScoreData = [
  { name: 'Jan', score: 72 },
  { name: 'Feb', score: 68 },
  { name: 'Mar', score: 74 },
  { name: 'Apr', score: 65 },
  { name: 'May', score: 62 },
  { name: 'Jun', score: 64 },
  { name: 'Jul', score: 58 },
];

const fraudTypesData = [
  { name: 'Card Not Present', value: 45 },
  { name: 'Account Takeover', value: 25 },
  { name: 'Identity Theft', value: 15 },
  { name: 'Transaction Fraud', value: 15 },
];

const colors = ['#2CA6A4', '#2F6690', '#0A2342', '#A4BAB7'];

const alertsData = [
  { name: 'Critical', value: 8 },
  { name: 'High', value: 15 },
  { name: 'Medium', value: 32 },
  { name: 'Low', value: 45 },
];

const alertColors = ['#E63946', '#F4A261', '#FFD166', '#A4BAB7'];

const FraudDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Daily Alerts</CardTitle>
            <CardDescription>Fraud alerts triggered today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-tusk-navy">24</div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <span>↓ 12% from yesterday</span>
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertsData}>
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {alertsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={alertColors[index % alertColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Average Risk Score</CardTitle>
            <CardDescription>Overall fraud risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-tusk-navy">58/100</div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <span>↓ 6 points this month</span>
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskScoreData}>
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2CA6A4" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Blocked Attempts</CardTitle>
            <CardDescription>Prevented fraud transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-tusk-navy">$42,891</div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <span>Protected this month</span>
            </div>
            <div className="mt-4 h-[60px] flex justify-center items-center">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-tusk-red"></span>
                <span>17 Attempts Blocked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transaction Activity</CardTitle>
            <CardDescription>Normal vs. Suspicious Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="normal" 
                    stackId="1" 
                    stroke="#2CA6A4" 
                    fill="#2CA6A4" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="suspicious" 
                    stackId="1" 
                    stroke="#E63946" 
                    fill="#E63946" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Types</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fraudTypesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fraudTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {fraudTypesData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                    <span className="truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-sm font-medium text-red-700">Critical Alert</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Large transaction ($5,200) from unusual location</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="text-sm font-medium text-orange-700">High Alert</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Multiple login attempts from different devices</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="text-sm font-medium text-yellow-700">Medium Alert</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Unusual transaction pattern detected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FraudDashboard;
