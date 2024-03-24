import { Schema, model } from "mongoose";

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

export { Recipe };
