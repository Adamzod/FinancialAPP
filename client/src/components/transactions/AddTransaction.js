import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../actions/transactionActions';
import { getCategories, addCategory } from '../../actions/categoryActions';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    date: '',
    category_id: '',
    newCategoryName: '', // Field for new category name
    type: 'expense',
    amount: '',
    description: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Select categories from the Redux store
  const categories = useSelector((state) => state.categories.categories || []);
  const { date, category_id, newCategoryName, type, amount, description } = formData;

  // Handle form data changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault();

    let selectedCategoryId = category_id;

    // Create a new category if no category is selected and a new name is provided
    if (!selectedCategoryId && newCategoryName) {
      const newCategory = await dispatch(addCategory({ name: newCategoryName, type }));

      // Validate if the new category was successfully created
      if (newCategory && newCategory.category_id) {
        selectedCategoryId = newCategory.category_id; // Assign the new category's ID
      } else {
        alert("Error adding new category. Please try again.");
        return;
      }
    }

    // Ensure amount is parsed as a float
    const parsedAmount = parseFloat(amount);

    // Validate form fields before submission
    if (!date || isNaN(parsedAmount) || parsedAmount <= 0 || !selectedCategoryId) {
      alert('Please complete all fields with valid values.');
      return;
    }

    // Dispatch the transaction with the updated or selected category_id
    dispatch(addTransaction({
      transaction_date: date,
      category_id: selectedCategoryId,
      amount: parsedAmount,
      description,
    }));

    // Redirect to the transactions page
    navigate('/transactions');
  };

  return (
    <div>
      <h2>Add Transaction</h2>
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

        {categories.length > 0 ? (
          <>
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category_id"
                value={category_id}
                onChange={onChange}
                className="form-control"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Or Enter New Category:</label>
              <input
                type="text"
                name="newCategoryName"
                value={newCategoryName}
                onChange={onChange}
                className="form-control"
                placeholder="New Category"
              />
            </div>
          </>
        ) : (
          <div className="form-group">
            <label>Enter Category:</label>
            <input
              type="text"
              name="newCategoryName"
              value={newCategoryName}
              onChange={onChange}
              className="form-control"
              placeholder="New Category"
              required
            />
          </div>
        )}

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
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className="form-control"
            placeholder="Add a description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;