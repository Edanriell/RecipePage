import { Router } from "express";

import { IRecipesController, RecipesController } from "../controllers";
import { RecipesService } from "../services";

class RecipesEndpoints {
	public readonly router: Router;
	private readonly _recipesController: IRecipesController;

	constructor() {
		this.router = Router();
		this._recipesController = new RecipesController(RecipesService.getServiceInstance());
		this.initializeRecipesEndpoints();
	}

	private initializeRecipesEndpoints() {
		this.router.get("/getrecipe", this._recipesController.getRandomRecipe);
	}
}

const recipesEndpoints = new RecipesEndpoints().router;

export { recipesEndpoints };
