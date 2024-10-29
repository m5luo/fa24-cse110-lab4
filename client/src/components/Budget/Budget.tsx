import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
    const context = useContext(AppContext);
    
    // Fetch budget on component mount
    useEffect(() => {
        loadBudget();
    }, []);

    // Function to load budget and handle errors
    const loadBudget = async () => {
        try {
        const budget = await fetchBudget();
        context.setBudget(budget);
        } catch (err: any) {
        console.log(err.message);
        }
    };

    const [inputBudget, setInputBudget] = useState(context.budget.toString())
    console.log(context.budget)

    const handleBudgetUpdate = (newBudget: string) => {
        setInputBudget(newBudget)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(context.budget)

        updateBudget(parseInt(inputBudget))
        context.setBudget(parseInt(inputBudget))
    };
    
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        <div>Budget: ${context.budget}</div>
        <form onSubmit={(event) => onSubmit(event)}>
        <div className="col-sm">
        <label htmlFor="budget">Update Budget</label>
            <input
                required
                type="number"
                className="form-control"
                id="budget"
                value={inputBudget}
                onChange={(event) =>
                     handleBudgetUpdate(event.target.value)}
            ></input>
            <div className="col-sm">
          <button data-testid="budgetSaveID" type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Budget;