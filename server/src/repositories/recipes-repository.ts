import { Recipe } from "../models";
import { RecipeDto } from "../dtos";
import { ApiError } from "../exceptions";

interface IRecipesRepository {
	getRandomRecipe(): Promise<RecipeDto>;
}

class RecipesRepository implements IRecipesRepository {
	public async getRandomRecipe() {
		const recipesCount = await Recipe.countDocuments();

		if (recipesCount === 0)
			throw ApiError.NotFound("Did not found any recipes in database.");

		const randomRecipeIndex = Math.floor(Math.random() * recipesCount);

		const randomRecipe = await Recipe
			.findOne()
			.skip(randomRecipeIndex)
			.exec();

		return new RecipeDto(randomRecipe!);
	}
}

export { IRecipesRepository, RecipesRepository };
