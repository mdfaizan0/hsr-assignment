import React, { useState, useEffect } from "react";
import "./App.css";
import { get, post } from "./utils/api";

import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [filters, setFilters] = useState({ category: "All", from: "", to: "" });
  const fetchExpenses = async () => {
    if (!token) return;
    try {
      let query = [];
      if (filters.category && filters.category !== "All")
        query.push(`category=${filters.category}`);
      if (filters.from) query.push(`from=${filters.from}`);
      if (filters.to) query.push(`to=${filters.to}`);

      const url = `/expenses${query.length ? `?${query.join("&")}` : ""}`;
      const data = await get(url, token);
      console.log("expenses data", data)
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const fetchSummary = async () => {
    if (!token) return;
    try {
      const data = await get("/summary", token);
      setSummary(data || {});
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const addExpense = async (expenseData) => {
    if (!token) return;
    try {
      const res = await post("/expenses", expenseData, token);
      if (res) {
        await fetchExpenses();
        await fetchSummary();
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchSummary();
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchExpenses();
  }, [filters]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setExpenses([]);
    setSummary({});
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  if (!token) {
    return (
      <div className="app-container">
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar name={user.name} onLogout={handleLogout} />

      <Dashboard summary={summary} />

      <AddExpenseForm onAddExpense={addExpense} />

      <Filters filters={filters} setFilters={setFilters} />

      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;