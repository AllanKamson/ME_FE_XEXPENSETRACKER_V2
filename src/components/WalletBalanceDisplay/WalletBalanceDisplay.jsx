import React from 'react';

const WalletBalanceDisplay = ({ balance, onAddIncome }) => {
  return (
    <div className="card">
      <p className="card-title">Wallet Balance: <span className="success">₹{balance.toFixed(0)}</span></p>
      <button type="button" className="button button-success button-shadow" onClick={onAddIncome}>
        + Add Income
      </button>
    </div>
  );
};

export default WalletBalanceDisplay;