import React, { useState, useEffect } from 'react';
import CustomModal from '../CustomModal/CustomModal';

const AddExpenseModal = ({ isOpen, onRequestClose, onAddExpense, editingExpense }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setPrice(editingExpense.price.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setTitle('');
      setPrice('');
      setCategory('');
      setDate('');
    }
  }, [editingExpense, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);

    if (!title || isNaN(parsedPrice) || parsedPrice <= 0 || !category || !date) {
      return;
    }

    onAddExpense({ title, price: parsedPrice, category, date });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="form-wrapper">
        <h3>{editingExpense ? 'Edit Expense' : 'Add Expenses'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-flex">
            <button 
            type="submit" 
            className="button button-primary button-shadow">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
            <button 
            type="button" 
            className="button button-secondary button-shadow" 
            onClick={onRequestClose}
            shouldCloseOnOverlayClick={true}
            >Cancel</button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default AddExpenseModal;