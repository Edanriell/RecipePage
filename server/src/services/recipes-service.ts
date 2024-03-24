import { Recipe } from "../models";
import { RecipeDto } from "../dtos";

interface IRecipesService {
	getRandomRecipe(): Promise<any>;
}

class RecipesService implements IRecipesService {
	public async getRandomRecipe() {
		const allRecipes = await Recipe.find();

		const recipes = [];

		for (const recipe of allRecipes) {
			recipes.push(new RecipeDto(recipe));
		}

		return { recipes };
	}
}

export { IRecipesService, RecipesService };
