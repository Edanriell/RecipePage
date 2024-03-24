import { Schema, model } from "mongoose";

type TRecipe = {
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

const recipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	preparationTime: {
		total: String,
		preparation: String,
		cooking: String
	},
	ingredients: [String],
	instructions: [
		{
			stepName: String,
			stepDescription: String
		}
	],
	nutrition: {
		calories: String,
		carbs: String,
		protein: String,
		fat: String
	},
	images: {
		mobile: String,
		desktop: String
	}
});

const Recipe = model("Recipe", recipeSchema);

export { TRecipe, Recipe };
