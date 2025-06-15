import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ExpenseSummary = ({ expenses }) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const data = Object.entries(
    expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.price;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const categories = ['Food', 'Entertainment', 'Travel'];
  const fullData = categories.map(cat => {
    const existing = data.find(d => d.name === cat);
    return existing || { name: cat, value: 0 };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={fullData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => {
              if (percent * 100 > 5) {
                  return `${(percent * 100).toFixed(0)}%`;
              }
              return '';
          }}
          isAnimationActive={false}
        >
          {fullData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType='rect' verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseSummary;