import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ExpenseList from "./ExpenseList";
import { Expense } from "../../types/types";

const expenseInitialState: Expense = {
    id: "",
    name: "",
    cost: 0,
}

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const context = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const[expense, setExpense] = useState(expenseInitialState)
  const[name, setName] = useState("");
  const handleNameInput = (name: string) => {
    setName(name);
    setExpense({ ...expense, id: name, name: name });
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
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={(event) =>
                handleCostInput(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
