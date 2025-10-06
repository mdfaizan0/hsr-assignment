import Expense from "../models/Expense.model.js";
import User from "../models/User.model.js";

export async function createExpense(req, res) {
    const { amount, category, notes, date } = req.body
    const user = req.user

    if (!amount || !category) {
        return res.status(400).json({ message: "Please fill required fields" })
    }

    try {
        const expense = await Expense.create({ amount, category, notes, date })
        const currentUser = await User.findOne({ email: user.email })

        currentUser.expenses.push(expense._id)
        await currentUser.save()

        return res.status(201).json({ message: "Expense created", expense })
    } catch (error) {
        return res.status(500).json({ message: "Server Error while creating expense", error: error.message })
    }
}

export async function getAllExpenses(req, res) {
  const user = req.user;

  try {
    const currentUser = await User.findOne({ email: user.email }).populate("expenses");
    let expenses = currentUser.expenses;

    // Filter by category
    if (req.query.category) {
      expenses = expenses.filter(
        (exp) => exp.category.toLowerCase() === req.query.category.trim().toLowerCase()
      );
    }

    // Filter by date range
    const { from, to } = req.query;
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      expenses = expenses.filter((exp) => {
        const expDate = new Date(exp.date);
        return expDate >= fromDate && expDate <= toDate;
      });
    }

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}


export async function getSummary(req, res) {
    const user = req.user

    try {
        const currentUser = await User.findOne({ email: user.email }).populate("expenses")

        const summary = await Expense.aggregate([
            { $match: { _id: { $in: currentUser.expenses } } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ])

        if (summary.length === 0) {
            return res.status(404).json({ message: "No expenses found for summary" });
        }

        const categories = {}
        let total = 0

        summary.forEach(item => {
            categories[item._id] = item.total
            total += item.total
        });

        return res.status(200).json({ message: "Expense summary fetched successfully", total, categories })
    } catch (error) {
        return res.status(500).json({ message: "Server Error while fetching summary", error: error.message });
    }
}