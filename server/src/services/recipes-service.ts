import { join } from "path";
import * as fs from "fs";

import { Recipe } from "../models";
import { RecipeDto } from "../dtos";
import { ApiError } from "../exceptions";

interface IRecipesRepository {
	getRandomRecipe(): Promise<RecipeDto>;
}

const rootFolderPath = join(__dirname, "..");
const recipesDataFilePath = `${rootFolderPath}\\data\\recipes.json`;

class RecipesService implements IRecipesRepository {
	public async getRandomRecipe() {
		const recipesCount = await Recipe.countDocuments();

		if (recipesCount === 0) throw ApiError.NotFound("Did not found any recipes in database.");

		const randomRecipeIndex = Math.floor(Math.random() * recipesCount);

		const randomRecipe = await Recipe.findOne().skip(randomRecipeIndex).exec();

		return new RecipeDto(randomRecipe!);
	}

	public async createNewRecipe({
		title,
		description,
		preparationTime,
		ingredients,
		instructions,
		nutrition,
		images
	}: {
		title: string;
		description: string;
		preparationTime: { total: string; preparation: string; cooking: string };
		ingredients: Array<string>;
		instructions: { stepName: string; stepDescription: string };
		nutrition: { calories: string; carbs: string; protein: string; fat: string };
		images: { mobile: string; desktop: string };
	}) {
		const recipe = await Recipe.findOne({ title });

		if (recipe) throw ApiError.BadRequest(`Recipe with title ${title} already exists in database.`);

		const newRecipe = await Recipe.create({
			title,
			description,
			preparationTime,
			ingredients,
			instructions,
			nutrition,
			images
		});

		return {
			id: newRecipe._id,
			title: newRecipe.title
		};
	}

	public async initializeRecipes() {
		const isRecipesAlreadyInitialized = await Recipe.find();

		if (isRecipesAlreadyInitialized) {
			console.error("Recipes already exists in database.");
			return;
		}

		fs.readFile(recipesDataFilePath, "utf8", (error, recipes) => {
			if (error) {
				console.error("Could not read the recipes data: ", error);
				throw new Error(
					"Unexpected error occurred. Could not read the necessary data for recipes."
				);
			}

			try {
				const recipesData = JSON.parse(recipes);

				for (const recipe of recipesData) {
					this.createNewRecipe({
						title: recipe.title,
						description: recipe.description,
						preparationTime: recipe.preparationTime,
						ingredients: recipe.ingredients,
						instructions: recipe.instructions,
						nutrition: recipe.nutrition,
						images: recipe.images
					});
				}

				console.log("Successfully created recipes in database.");
			} catch (error) {
				console.error("An error occurred while parsing JSON data: ", error);
				throw new Error("Failed to parse JSON data.");
			}
		});
	}
}

export { IRecipesRepository, RecipesService };
