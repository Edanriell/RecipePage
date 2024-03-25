import { DIContainer } from "rsdi";

import { RecipesRepository } from "../repositories";
import { RecipesController } from "../controllers";

type AppDIContainer = ReturnType<typeof diConfig>;

const diConfig = () => {
	return new DIContainer()
		.add("recipesService", () => new RecipesRepository())
		.add("recipesController", ({ recipesService }) => new RecipesController(recipesService));
};

export { AppDIContainer, diConfig };
