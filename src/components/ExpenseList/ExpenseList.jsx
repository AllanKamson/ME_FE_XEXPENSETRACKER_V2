import React, { useState, useEffect } from 'react';
import TransactionCard from '../TransactionCard/TransactionCard';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";


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
            <IoIosArrowRoundBack />
          </button>
          <p>{currentPage}</p> 
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <IoIosArrowRoundForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;