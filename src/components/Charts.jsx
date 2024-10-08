import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useExpenses } from '../context/ExpenseContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { expenses } = useExpenses();

  // Prepare monthly expenses data
  const getMonthlyExpenses = () => {
    const months = Array(12).fill(0);
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      months[month] += expense.amount;
    });
    return months;
  };

  // Line chart data for monthly expenses
  const monthlyExpensesData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: getMonthlyExpenses(),
        borderColor: '#00bcd4', // Light cyan for line color
        backgroundColor: 'rgba(0, 188, 212, 0.2)', // Lighter cyan for fill
        pointBackgroundColor: '#ff5722', // Bright orange for points
        pointHoverBackgroundColor: '#ff5722',
        tension: 0.3,
        borderWidth: 2,
        hoverBorderColor: '#fff',
        hoverBorderWidth: 2,
      },
    ],
  };

  // Prepare category expenses data
  const getCategoryExpenses = () => {
    const categories = {};
    expenses.forEach((expense) => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });
    return categories;
  };

  const categoryExpenses = getCategoryExpenses();

  // Pie chart data for category expenses
  const categoryExpensesData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryExpenses),
        backgroundColor: [
          '#8e44ad', '#2980b9', '#e74c3c', '#16a085', '#f39c12', '#2ecc71',
        ],
        hoverBackgroundColor: [
          '#9b59b6', '#3498db', '#e74c3c', '#1abc9c', '#f1c40f', '#27ae60',
        ],
        hoverOffset: 12,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-light mb-4">Expense Analytics Dashboard</h2>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card bg-dark text-light shadow-lg border-0">
            <div className="card-body">
              <h4 className="text-center">Monthly Expense Overview</h4>
              <Line data={monthlyExpensesData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      color: '#fff', // White legend text
                    },
                  },
                  tooltip: {
                    backgroundColor: '#333',
                    titleColor: '#fff',
                    bodyColor: '#eee',
                  },
                  title: {
                    display: true,
                    text: 'Expenses over the Year',
                    color: '#fff',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#00bcd4', // Same color as line
                    },
                  },
                  x: {
                    ticks: {
                      color: '#00bcd4',
                    },
                  },
                },
              }} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card bg-dark text-light shadow-lg border-0">
            <div className="card-body">
              <h4 className="text-center">Expense Distribution by Category</h4>
              <Pie data={categoryExpensesData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      color: '#fff', // White legend text
                    },
                  },
                  tooltip: {
                    backgroundColor: '#333',
                    titleColor: '#fff',
                    bodyColor: '#eee',
                  },
                  title: {
                    display: true,
                    text: 'Category-wise Expenses',
                    color: '#fff',
                  },
                },
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
