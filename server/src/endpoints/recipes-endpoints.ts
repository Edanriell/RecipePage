import { Router } from "express";

import { IRecipesController, RecipesController } from "../controllers";
import { RecipesRepository } from "../repositories";

class RecipesEndpoints {
	public readonly router = Router();
	private readonly _recipesController: IRecipesController;

	constructor() {
		this._recipesController = new RecipesController(new RecipesRepository());
		this.initializeRecipesEndpoints();
	}

	private initializeRecipesEndpoints() {
		this.router.get("/getrecipe", this._recipesController.getRandomRecipe);
	}
}

const recipesEndpoints = new RecipesEndpoints().router;

export { recipesEndpoints };

