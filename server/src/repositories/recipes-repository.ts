import { Recipe } from "../models";
import { RecipeDto } from "../dtos";

interface IRecipesRepository {
	getRandomRecipe(): Promise<RecipeDto>;
}

class RecipesRepository implements IRecipesRepository {
	public async getRandomRecipe() {
		const allRecipes = await Recipe.find();

		const recipes: Array<RecipeDto> = [];

		for (const recipe of allRecipes) {
			recipes.push(new RecipeDto(recipe));
		}

		const randomRecipeNumber = Math.random() * allRecipes.length;

		return recipes[randomRecipeNumber];
	}
}

export { IRecipesRepository, RecipesRepository };
