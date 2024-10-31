import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const index = expenses.findIndex(expense => expense.id === id);
    console.log("deleted",index)
    
    if (index === -1) {
        return res.status(404).send({ error: "Expense index not found" });
    }
    // const [deletedExpense] = expenses.splice(index, 1);

    expenses = expenses.splice(index,1);
    console.log(JSON.stringify(expenses));
    return res.status(200).send(expenses);


    // const expenseToRemoveID = id;
    // const updatedExpensesList = expenses.filter((expense) => expense.id !== expenseToRemoveID);
    // const indexToRemove = expenses.indexOf(expenseToRemoveID);
    
    // if (indexToRemove > -1) {
    //     expenses.splice(indexToRemove, 1);
    // }
    
    // const updatedExpensesList = expenses.filter(id => oldExpense.id);
    // expenses = updatedExpensesList;

    
    // if (index > -1) {
    //     // expenses.splice(index, 1);
    //     const [deletedExpense] = expenses.splice(index, 1);
    //     return res.status(200).send(deletedExpense);
    // }
    
    // return res.status(404).send({ error: "Expense not found" });
    // const updatedStrings = deleteStringById(strings, "cherry");
    // res.status(201).send(expenses);
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}