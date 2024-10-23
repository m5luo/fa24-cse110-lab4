import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";

describe("Create an Expense", () => {
    test("renders expense item in expense list, total spent and remaining are updated", () => {
        render(<App />);

        const name = screen.getByLabelText(/name/i);
        const cost = screen.getByLabelText(/cost/i);
        const saveBtn = screen.getByTestId('saveID');
        const total = screen.getByText('Spent so far: $0');
        const remaining = screen.getByText('Remaining: $1000');

        // total 50
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 1' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '50' 
            } 
        });
        fireEvent.click(saveBtn);

        expect(screen.getByText('Expense 1')).toBeInTheDocument();
        expect(total).toHaveTextContent('Spent so far: $50');
        expect(remaining).toHaveTextContent('Remaining: $950');
    });
});

describe("Delete an Expense", () => {
    test("renders expense item in expense list, deletes said expense item, total spent and remaining are updated", () => {
        render(<App />);

        const name = screen.getByLabelText(/name/i);
        const cost = screen.getByLabelText(/cost/i);
        const saveBtn = screen.getByTestId('saveID');
        const total = screen.getByText('Spent so far: $0');
        const remaining = screen.getByText('Remaining: $1000');

        // total 50
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 1' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '50' 
            } 
        });
        fireEvent.click(saveBtn);

        expect(screen.getByText('Expense 1')).toBeInTheDocument();
        expect(total).toHaveTextContent('Spent so far: $50');
        expect(remaining).toHaveTextContent('Remaining: $950');

        const deleteBtn = screen.getByTestId('deleteID');

        // total 0
        fireEvent.click(deleteBtn);

        expect(screen.queryByText('Expense 1')).not.toBeInTheDocument();
        expect(total).toHaveTextContent('Spent so far: $0');
        expect(remaining).toHaveTextContent('Remaining: $1000');
    });
});

describe("Budget Balance Verification", () => {
    test("after various operations of add/delete expense(s), check to see if budget = remaining + total", () => {
        render(<App />);

        const name = screen.getByLabelText(/name/i);
        const cost = screen.getByLabelText(/cost/i);
        const saveBtn = screen.getByTestId('saveID');
        const total = screen.getByText('Spent so far: $0');
        const remaining = screen.getByText('Remaining: $1000');
        const budget = screen.getByText('Budget: $1000');

        // total 50
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 1' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '50' 
            } 
        });
        fireEvent.click(saveBtn);

        let deleteBtn = screen.getAllByTestId('deleteID');

        // total 0
        fireEvent.click(deleteBtn[0]);

        // total 500
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 2' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '500' 
            } 
        });
        fireEvent.click(saveBtn);

        // total 700
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 3' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '200' 
            } 
        });
        fireEvent.click(saveBtn);

        deleteBtn = screen.getAllByTestId('deleteID');
        
        // total 200
        fireEvent.click(deleteBtn[0]);

        // total 500
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 4' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '300' 
            } 
        });
        fireEvent.click(saveBtn);

        // total 600
        fireEvent.change(name, { 
            target: { 
                value: 'Expense 5' 
            } 
        });
        fireEvent.change(cost, { 
            target: { 
                value: '100' 
            } 
        });
        fireEvent.click(saveBtn);

        expect(total).toHaveTextContent('Spent so far: $600');
        expect(remaining).toHaveTextContent('Remaining: $400');
        expect(budget).toHaveTextContent('Budget: $1000');
    });
});