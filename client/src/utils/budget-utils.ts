import { API_BASE_URL } from "../constants";
// import { Expense } from "../types/types";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    console.log("in fetch budgets")
    const response = await fetch(`${API_BASE_URL}/budget`);
	if (!response.ok) {
    	throw new Error('Failed to fetch budget');
	}

	// Parsing the response to get the data
	let budget = response.json().then((jsonResponse) => {
    	console.log("data in fetchBudget", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchBudget", budget);
	return budget;
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
    // console.log("in update Budget")
    // console.log(JSON.stringify({ "data": budget }))

    const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify({ "data": budget })
	});
    if (!response.ok) {
    	throw new Error("Failed to update budget");
	}
	return response.json();
};