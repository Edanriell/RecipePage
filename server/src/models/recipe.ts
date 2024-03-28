import { Schema, model, Types } from "mongoose";

type TRecipe = {
	_id: Types.ObjectId;
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
		type: {
			total: {
				type: String,
				required: true
			},
			preparation: {
				type: String,
				required: true
			},
			cooking: {
				type: String,
				required: true
			}
		},
		required: true
	},
	ingredients: {
		type: [String],
		required: true
	},
	instructions: {
		type: [
			{
				stepName: {
					type: String,
					required: true
				},
				stepDescription: {
					type: String,
					required: true
				}
			}
		],
		required: true
	},
	nutrition: {
		type: {
			calories: {
				type: String,
				required: true
			},
			carbs: {
				type: String,
				required: true
			},
			protein: {
				type: String,
				required: true
			},
			fat: {
				type: String,
				required: true
			}
		},
		required: true
	},
	images: {
		type: {
			mobile: {
				type: String,
				required: true
			},
			desktop: {
				type: String,
				required: true
			}
		},
		required: true
	}
});

const Recipe = model("Recipe", recipeSchema);

export { TRecipe, Recipe };
