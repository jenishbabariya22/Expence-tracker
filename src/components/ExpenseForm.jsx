import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ExpenseForm = () => {
  const { dispatch } = useExpenses();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch({ type: 'SET_EXPENSES', payload: storedExpenses });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!description || !date || !category) {
      toast.error('Please fill all the required fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      date,
      category,
      paymentMethod,
    };

    const updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updatedExpenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    setAmount('');
    setDescription('');
    setDate('');
    setCategory('');
    setPaymentMethod('cash');

    toast.success('Expense added successfully!');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Add New Expense</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label fw-bold">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label fw-bold">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-bold">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    list="category-suggestions"
                  />
                  <datalist id="category-suggestions">
                    <option value="Food" />
                    <option value="Transport" />
                    <option value="Entertainment" />
                  </datalist>
                </div>

                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label fw-bold">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Credit</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default ExpenseForm;
