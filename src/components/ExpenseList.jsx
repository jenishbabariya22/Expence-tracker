import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ExpenseList = () => {
  const { expenses, dispatch } = useExpenses();
  const [filter, setFilter] = useState('');

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });

    const updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const newExpenses = updatedExpenses.filter((expense) => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
    toast.error('Expense deleted successfully!');
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(filter.toLowerCase()) ||
      expense.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h2 className="text-primary">Expense List</h2>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Search by category or description"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </header>

      <div className="row">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div key={expense.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    ${expense.amount}
                  </h5>
                  <p className="card-text text-muted">
                    <strong>Description: </strong>{expense.description}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Category: </strong>{expense.category}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Date: </strong>{expense.date}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Payment Method: </strong>{expense.paymentMethod}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">No expenses found</p>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ExpenseList;
