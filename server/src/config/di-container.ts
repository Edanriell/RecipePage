import { DIContainer } from "rsdi";

import { RecipesService } from "../services";
import { RecipesController } from "../controllers";

type AppDIContainer = ReturnType<typeof diConfiguration>;

const diConfiguration = () => {
	return new DIContainer()
		.add("recipesService", () => new RecipesService())
		.add("recipesController", ({ recipesService }) => new RecipesController(recipesService));
};

export default diConfiguration;
export { AppDIContainer };
