import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    
    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        let record = db.get('SELECT 1 FROM table_name WHERE id=?;', [id]);
        if (!record) {
            return res.status(400).send({ error: `Expense does not exist` });
        }
        await db.run('DELETE FROM expenses WHERE id=?;', [id]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    };
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    // res.status(200).send({ "data": expenses });
    try {
        let rows = await db.all('SELECT description, cost FROM expenses;');
        res.status(201).send({"data":rows});
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be get, + ${error}` });
    };

}