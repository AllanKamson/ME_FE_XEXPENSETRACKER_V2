import React, { useState, useEffect } from 'react';
import TransactionCard from '../TransactionCard/TransactionCard';

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"></path></svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"></path></svg>
);


const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3; 

  // Calculate total pages
  const totalPages = Math.ceil(expenses.length / transactionsPerPage);

  // Adjust current page if transactions are deleted and page becomes empty
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1); 
    }
  }, [expenses.length, totalPages, currentPage]);

  // Get current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = expenses.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (expenses.length === 0) {
    return <p className="empty-transactions-wrapper">No transactions!</p>;
  }

  return (
    
    <div className="transactions-list-wrapper">
      
      {currentTransactions.map((expense) => (
        <TransactionCard
          key={expense.id}
          details={expense}
          handleDelete={onDelete}
          handleEdit={onEdit}
        />
      ))}

      {totalPages > 1 && ( 
        <div className="pagination-wrapper">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft />
          </button>
          <p>{currentPage}</p> 
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;