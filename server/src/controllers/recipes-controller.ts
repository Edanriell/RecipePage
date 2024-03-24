import { Request, Response, NextFunction } from "express";

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
	}): Promise<any>;
}

class RecipesController implements IRecipesController {
	private readonly _recipesServices: IRecipesService;

	public constructor(recipesService: IRecipesService) {
		this._recipesServices = recipesService;
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
			const recipe = await this._recipesServices.getRandomRecipe();

			return response.json(recipe);
		} catch (error) {
			next(error);
		}
	}
}

export { IRecipesController, RecipesController };
