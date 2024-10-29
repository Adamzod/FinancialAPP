import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../actions/transactionActions';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div>
      <h2>Your Transactions</h2>
      <Link to="/transactions/add" className="btn btn-primary mb-3">
        Add Transaction
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id}>
              <td>{txn.category_name || 'Uncategorized'}</td>
              <td>
                {txn.transaction_date 
                  ? new Date(txn.transaction_date).toLocaleDateString() 
                  : 'N/A'}
              </td>
              <td>{txn.category_type || 'N/A'}</td>
              <td>
                {typeof txn.amount === 'number'
                  ? txn.amount.toFixed(2)
                  : 'N/A'}
              </td>
              <td>
                <Link to={`/transactions/edit/${txn.transaction_id}`} className="btn btn-sm btn-secondary mr-2">
                  Edit
                </Link>
                {/* You can add a delete button here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;