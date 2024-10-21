import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
    const context = useContext(AppContext);
    const budget = context.budget;
    
    const [updateBudget, setUpdateBudget] = useState(budget.toString())

    const handleBudgetUpdate = (newBudget: string) => {
        setUpdateBudget(newBudget)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        context.setBudget(parseInt(updateBudget))
    };
    
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        <div>Budget: ${budget}</div>
        <form onSubmit={(event) => onSubmit(event)}>
        <div className="col-sm">
        <label htmlFor="budget">Update Budget</label>
            <input
                required
                type="number"
                className="form-control"
                id="budget"
                value={updateBudget}
                onChange={(event) =>
                     handleBudgetUpdate(event.target.value)}
            ></input>
            <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Budget;
