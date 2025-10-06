import { useState } from "react";

const AddExpenseForm = ({ onAddExpense }) => {
  const today = new Date().toISOString().split("T")[0];

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category) {
      alert("Amount and category are required");
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      category,
      date,
      notes,
    };

    onAddExpense(expenseData);

    setAmount("");
    setCategory("Food");
    setDate(today);
    setNotes("");
  };

  return (
    <section className="add-expense-form">
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Notes:</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </section>
  );
};

export default AddExpenseForm;