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
		mobile: Buffer | string;
		desktop: Buffer | string;
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
			_id: false,
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
				_id: false,
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
			_id: false,
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
			_id: false,
			mobile: {
				type: Buffer,
				required: true
			},
			desktop: {
				type: Buffer,
				required: true
			}
		},
		required: true
	}
});

const Recipe = model("Recipe", recipeSchema);

export { TRecipe, Recipe };
