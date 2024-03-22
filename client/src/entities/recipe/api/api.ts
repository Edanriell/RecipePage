export const getRecipesQuery = async () => {
	try {
		const response = await fetch("path", {
			method: "Get"
		});

		if (response.status === 404) {
			throw new Error("Recipes not found");
		}

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			throw new Error("Response is not in JSON format");
		}

		return response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

// apiUrl = ""; env
