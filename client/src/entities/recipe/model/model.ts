export type TRecipe = {
	_id: string;
	title: string;
	description: string;
	preparationTime: {
		total: string;
		preparation: string;
		cooking: string;
	};
	ingredients: Array<string>;
	instructions: Array<{
		stepName: string;
		stepDescription: string;
	}>;
	nutrition: {
		calories: string;
		carbs: string;
		protein: string;
		fat: string;
	};
	images: {
		mobile: string;
		desktop: string;
	};
};
