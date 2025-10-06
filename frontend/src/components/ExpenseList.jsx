const ExpenseList = ({ expenses }) => {
  if (!expenses.length) {
    return <p style={{ margin: "20px" }}>No expenses found.</p>;
  }

  return (
    <section className="expense-list">
      <h3>Expense List</h3>
      <table>
        <thead>
          <tr>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.amount.toFixed(2)}</td>
              <td>{exp.category}</td>
              <td>{new Date(exp.date).toISOString().split("T")[0]}</td>
              <td>{exp.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ExpenseList;