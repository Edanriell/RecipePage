import { NextFunction, Request, Response } from "express";

import { RecipeDto } from "../dtos";
import { IRecipesService } from "../services";

interface IRecipesController {
	getRandomRecipe(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<Response<RecipeDto> | void>;
}

class RecipesController implements IRecipesController {
	private readonly _recipesService: IRecipesService;

	public constructor(recipesService: IRecipesService) {
		this._recipesService = recipesService;
		this.getRandomRecipe = this.getRandomRecipe.bind(this);
	}

	public async getRandomRecipe(request: Request, response: Response, next: NextFunction) {
		try {
			const recipe = await this._recipesService.getRandomRecipe();

			return response.json(recipe);
		} catch (error) {
			next(error);
		}
	}
}

export { IRecipesController, RecipesController };
