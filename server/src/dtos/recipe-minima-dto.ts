import { TRecipeMinimal } from "../models";

class RecipeMinimalDto {
	public id;
	public title;

	constructor(model: TRecipeMinimal) {
		this.id = model._id;
		this.title = model.title;
	}
}

export { RecipeMinimalDto };
