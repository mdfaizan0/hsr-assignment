import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleFromChange = (e) => {
    setFilters({ ...filters, from: e.target.value });
  };

  const handleToChange = (e) => {
    setFilters({ ...filters, to: e.target.value });
  };

  const handleReset = () => {
    setFilters({ category: "All", from: "", to: "" });
  };

  return (
    <section className="filters">
      <h3>Filters</h3>
      <div className="filter-controls">
        <label>
          Category:
          <select value={filters.category} onChange={handleCategoryChange}>
            <option>All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Others</option>
          </select>
        </label>

        <label>
          From:
          <input type="date" value={filters.from} onChange={handleFromChange} />
        </label>

        <label>
          To:
          <input type="date" value={filters.to} onChange={handleToChange} />
        </label>

        <button onClick={handleReset}>Reset</button>
      </div>
    </section>
  );
};

export default Filters;