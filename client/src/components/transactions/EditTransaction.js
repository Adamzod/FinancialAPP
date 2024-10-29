import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionById,
  updateTransaction,
} from '../../actions/transactionActions';
import { useParams, useNavigate } from 'react-router-dom';

const EditTransaction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { transaction, loading } = useSelector((state) => state.transactions);

  const [formData, setFormData] = useState({
    date: '',
    category: '',
    type: '',
    amount: '',
  });

  useEffect(() => {
    dispatch(getTransactionById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date.slice(0, 10),
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount,
      });
    }
  }, [transaction]);

  const { date, category, type, amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTransaction(id, formData));
    history.push('/transactions');
  };

  if (loading || !transaction) {
    return <div>Loading transaction...</div>;
  }

  return (
    <div>
      <h2>Edit Transaction</h2>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            className="form-control"
            placeholder="e.g., Food, Rent"
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={type}
            onChange={onChange}
            className="form-control"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            className="form-control"
            placeholder="0.00"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
