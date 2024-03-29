import { Request, Response, NextFunction } from "express";

import { RecipeDto } from "../dtos";
import { IRecipesService } from "../services";

interface IRecipesController {
	getRandomRecipe({
		request,
		response,
		next
	}: {
		request: Request;
		response: Response;
		next: NextFunction;
	}): Promise<Response<RecipeDto> | void>;
}

class RecipesController implements IRecipesController {
	private readonly _recipesRepository: IRecipesService;

	public constructor(recipesRepository: IRecipesService) {
		this._recipesRepository = recipesRepository;
	}

	public async getRandomRecipe({
		request,
		response,
		next
	}: {
		request: Request;
		response: Response;
		next: NextFunction;
	}) {
		try {
			const recipe = await this._recipesRepository.getRandomRecipe();

			return response.json(recipe);
		} catch (error) {
			next(error);
		}
	}
}

export { IRecipesController, RecipesController };
