export const getRecipeQuery = async () => {
	const response = await fetch(import.meta.env.VITE_API_URL! + "api/getrecipe", {
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
};
