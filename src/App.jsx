import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundel.js';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<ExpenseList />} />
                    <Route path="/add-expense" element={<ExpenseForm />} />
                    <Route path="/charts" element={<Charts />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
