import { TRecipe } from "../models";

class RecipeDto {
	public id;
	public title;
	public description;
	public preparationTime;
	public ingredients;
	public nutrition;
	public images;

	constructor(model: TRecipe) {
		this.id = model._id;
		this.title = model.title;
		this.description = model.description;
		this.preparationTime = model.preparationTime;
		this.ingredients = model.ingredients;
		this.nutrition = model.nutrition;
		this.images = model.images;
	}
}

export { RecipeDto };
