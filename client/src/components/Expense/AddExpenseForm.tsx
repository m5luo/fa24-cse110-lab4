import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ExpenseList from "./ExpenseList";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const expenseInitialState: Expense = {
    id: "",
    description: "",
    cost: 0,
}

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  createExpense(expenseInitialState);
  const context = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const[expense, setExpense] = useState(expenseInitialState)
  const[name, setName] = useState("");
  const handleNameInput = (name: string) => {
    setName(name);
    setExpense({ ...expense, id: name, description: name });
  }
  const[cost, setCost] = useState("0");
  const handleCostInput = (cost: string) => {
    setCost(cost);
    setExpense({ ...expense, cost: parseInt(cost)})
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    context.setExpenses(context.expenses.concat(expense));
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            // HINT: onChange={}
            onChange={(event) =>
                handleNameInput(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={(event) =>
                handleCostInput(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button data-testid="saveID" type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
