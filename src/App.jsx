import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import WalletBalanceDisplay from './components/WalletBalanceDisplay/WalletBalanceDisplay';
import AddBalanceModal from './components/AddBalanceModal/AddBalanceModal';
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends/ExpenseTrends';

// Main App Component
function App() {
  const [walletBalance, setWalletBalance] = useState(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    return savedBalance ? parseFloat(savedBalance) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddIncome = (amount) => {
    setWalletBalance((prevBalance) => prevBalance + amount);
    enqueueSnackbar('Income added successfully!', { variant: 'success' });
    setIsAddBalanceModalOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    if (editingExpense) {
      const oldExpense = expenses.find(exp => exp.id === editingExpense.id);
      const oldPrice = oldExpense ? oldExpense.price : 0;
      const priceDifference = newExpense.price - oldPrice;

      if (walletBalance < priceDifference) {
          enqueueSnackbar('Cannot update expense: Insufficient wallet balance for the increased amount!', { variant: 'error' });
          return;
      }

      const updatedExpenses = expenses.map((exp) =>
        exp.id === editingExpense.id ? { ...newExpense, id: exp.id } : exp
      );
      setExpenses(updatedExpenses);
      setWalletBalance((prevBalance) => prevBalance - priceDifference);
      enqueueSnackbar('Expense updated successfully!', { variant: 'success' });
      setEditingExpense(null);
    } else {
      if (newExpense.price > walletBalance) {
        enqueueSnackbar('Cannot add expense: Insufficient wallet balance!', { variant: 'error' });
        return;
      }
      const expenseWithId = { ...newExpense, id: Date.now() };
      setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
      setWalletBalance((prevBalance) => prevBalance - newExpense.price);
      enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    }
    setIsAddExpenseModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    const expenseToDelete = expenses.find((exp) => exp.id === id);
    if (expenseToDelete) {
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
      setWalletBalance((prevBalance) => prevBalance + expenseToDelete.price);
      enqueueSnackbar('Expense deleted successfully!', { variant: 'info' });
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsAddExpenseModalOpen(true);
  };

  const totalExpensesAmount = expenses.reduce((sum, exp) => sum + exp.price, 0);

  return (
    <div className="home-container">
      <h1>Expense Tracker</h1>

      <div className="cards-wrapper">
        <WalletBalanceDisplay
          balance={walletBalance}
          onAddIncome={() => setIsAddBalanceModalOpen(true)}
        />
        <div className="card">
          <p className="card-title">Expenses: <span className="failure">₹{totalExpensesAmount.toFixed(0)}</span></p>
          <button type="button" className="button button-failure button-shadow" onClick={() => {
            setEditingExpense(null);
            setIsAddExpenseModalOpen(true);
          }}>
            + Add Expense
          </button>
        </div>
        <div className="card">
            <ExpenseSummary expenses={expenses} />
        </div>
      </div>

      <div className="transactions-display-wrapper">
        <div className="transactions-list-wrapper">
          <h2 className="transactions-list-title">Recent Transactions</h2>
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        </div>
        <div className="expense-chart">
          <ExpenseTrends expenses={expenses} />
        </div>
      </div>

      <AddBalanceModal
        isOpen={isAddBalanceModalOpen}
        onRequestClose={() => setIsAddBalanceModalOpen(false)}
        onAddIncome={handleAddIncome}
      />

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onRequestClose={() => setIsAddExpenseModalOpen(false)}
        onAddExpense={handleAddExpense}
        editingExpense={editingExpense}
      />
    </div>
  );
}

// SnackbarProvider for notifications
function RootApp() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <App />
    </SnackbarProvider>
  );
}

export default RootApp;