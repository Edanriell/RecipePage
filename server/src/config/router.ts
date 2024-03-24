import { Application } from "express";

import { AppDIContainer } from "./di-container.ts";

const routerConfiguration = (app: Application, diContainer: AppDIContainer) => {
	const { recipesController } = diContainer;

	app.route("/api/getrecipe").get(recipesController.getRandomRecipe);
};

export default routerConfiguration;
