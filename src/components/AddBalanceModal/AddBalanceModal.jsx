import React, { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal'; // Import the custom modal

const AddBalanceModal = ({ isOpen, onRequestClose, onAddIncome }) => {
  const [incomeAmount, setIncomeAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddIncome(amount);
      setIncomeAmount(''); // Clear input
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="form-wrapper">
        <h3>Add Balance</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-flex">
            <input
              type="number"
              placeholder="Income Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-flex">
            <button type="submit" className="button button-primary button-shadow">Add Balance</button>
            <button type="button" className="button button-secondary button-shadow" onClick={onRequestClose}>Cancel</button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default AddBalanceModal;