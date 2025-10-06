import PieChart from "./PieChart";

const Dashboard = ({ summary }) => {
  const { total = 0, categories = {} } = summary;

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-container">
        {/* Total Spend */}
        <div className="total-spend">
          <h3>Total Spend: ₹{total}</h3>
        </div>

        {/* Category Breakdown */}
        <div className="category-breakdown">
          <h3>Category Breakdown</h3>
          <ul>
            <li>Food: ₹{categories.Food || 0}</li>
            <li>Travel: ₹{categories.Travel || 0}</li>
            <li>Shopping: ₹{categories.Shopping || 0}</li>
            <li>Bills: ₹{categories.Bills || 0}</li>
            <li>Others: ₹{categories.Others || 0}</li>
          </ul>
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <PieChart data={categories} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;