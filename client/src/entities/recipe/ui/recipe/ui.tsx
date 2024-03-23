import { FC, useEffect, useState } from "react";

import { getRecipeQuery } from "@entities/recipe/api";
import { TRecipe } from "@entities/recipe/model";

import "./styles.scss";

import RecipeImageDesktop from "./assets/recipe-image-desktop.jpeg";
import RecipeImageMobile from "./assets/recipe-image-mobile.jpeg";

type RecipeState = "notLoading" | "loading" | "loaded" | "error";

const Recipe: FC = () => {
	const [isRecipeLoading, setIsRecipeLoading] = useState<RecipeState>("notLoading");
	const [recipeData, setRecipeData] = useState<TRecipe>();

	useEffect(() => {
		(async () => {
			try {
				setIsRecipeLoading("loading");
				const data = await getRecipeQuery();
				setIsRecipeLoading("loaded");
				setRecipeData(data);
			} catch (error) {
				setIsRecipeLoading("error");
				console.error("Error fetching data:", error);
			}
		})();
	}, []);

	return (
		<article className={"recipe"}>
			<picture>
				<source media="(max-width:376px)" srcSet={RecipeImageMobile} />
				<source media="(min-width:377px)" srcSet={RecipeImageDesktop} />
				<img
					className={"recipe__image"}
					src={RecipeImageDesktop}
					alt={"Simple Omelette Recipe image"}
				/>
			</picture>
			<div className={"recipe__container"}>
				<h2 className={"recipe__title recipe__title_margin-bottom_16px"}>Simple Omelette Recipe</h2>
				<p className={"recipe__paragraph recipe__paragraph_margin-bottom_32px"}>
					An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs
					cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.
				</p>
				<div className={"recipe__preparation-time"}>
					<h3
						className={
							"recipe__subtitle recipe__subtitle_style_dark-raspberry recipe__subtitle_margin-bottom_14px"
						}
					>
						Preparation time
					</h3>
					<ul className={"recipe__preparation-time-list"}>
						<li className={"recipe__preparation-time-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								Total: Approximately 10 minutes
							</p>
						</li>
						<li className={"recipe__preparation-time-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								Preparation: 5 minutes
							</p>
						</li>
						<li className={"recipe__preparation-time-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Cooking: 5 minutes</p>
						</li>
					</ul>
				</div>
				<div className={"recipe__ingredients"}>
					<h3
						className={
							"recipe__subtitle recipe__subtitle_style_brandy-red recipe__subtitle_margin-bottom_17px"
						}
					>
						Ingredients
					</h3>
					<ul className={"recipe__ingredients-list"}>
						<li className={"recipe__ingredients-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>2-3 large eggs</p>
						</li>
						<li className={"recipe__ingredients-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Salt, to taste</p>
						</li>
						<li className={"recipe__ingredients-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Pepper, to taste</p>
						</li>
						<li className={"recipe__ingredients-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								1 tablespoon of butter or oil
							</p>
						</li>
						<li className={"recipe__ingredients-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								Optional fillings: cheese, diced vegetables, cooked meats, herbs
							</p>
						</li>
					</ul>
				</div>
				<div className={"recipe__divider"}></div>
				<div className={"recipe__instructions"}>
					<h3
						className={
							"recipe__subtitle recipe__subtitle_style_brandy-red recipe__subtitle_margin-bottom_17px"
						}
					>
						Instructions
					</h3>
					<ol className={"recipe__instructions-list"}>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
								Beat the eggs:
							</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed.
								You can add a tablespoon of water or milk for a fluffier texture.
							</p>
						</li>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
								Heat the pan:
							</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								Place a non-stick frying pan over medium heat and add butter or oil.
							</p>
						</li>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
								Cook the omelette:
							</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the
								eggs evenly coat the surface.
							</p>
						</li>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
								Add fillings (optional):
							</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								When the eggs begin to set at the edges but are still slightly runny in the middle,
								sprinkle your chosen fillings over one half of the omelette.
							</p>
						</li>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
								Fold and serve:
							</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								As the omelette continues to cook, carefully lift one edge and fold it over the
								fillings. Let it cook for another minute, then slide it onto a plate.
							</p>
						</li>
						<li className={"recipe__instructions-list-item"}>
							<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>Enjoy:</strong>
							<p
								className={
									"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
								}
							>
								Serve hot, with additional salt and pepper if needed.
							</p>
						</li>
					</ol>
				</div>
				<div className={"recipe__divider"}></div>
				<div className={"recipe__nutrition"}>
					<h3
						className={
							"recipe__subtitle recipe__subtitle_style_brandy-red recipe__subtitle_margin-bottom_17px"
						}
					>
						Nutrition
					</h3>
					<p className={"recipe__paragraph recipe__paragraph_margin-bottom_12px"}>
						The table below shows nutritional values per serving without the additional fillings.
					</p>
					<table className={"recipe__nutrition-table"}>
						<tbody className={"recipe__nutrition-table-body"}>
							<tr className={"recipe__nutrition-table-row"}>
								<td className={"recipe__nutrition-table-row-name"}>
									<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Calories</p>
								</td>
								<td className={"recipe__nutrition-table-row-value"}>
									<p
										className={
											"recipe__paragraph recipe__paragraph_weight_700 recipe__paragraph_margin_0px recipe__paragraph_color_brandy-red"
										}
									>
										277kcal
									</p>
								</td>
							</tr>
							<tr className={"recipe__nutrition-table-row"}>
								<td className={"recipe__nutrition-table-row-name"}>
									<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Carbs</p>
								</td>
								<td className={"recipe__nutrition-table-row-value"}>
									<p
										className={
											"recipe__paragraph recipe__paragraph_weight_700 recipe__paragraph_margin_0px recipe__paragraph_color_brandy-red"
										}
									>
										0g
									</p>
								</td>
							</tr>
							<tr className={"recipe__nutrition-table-row"}>
								<td className={"recipe__nutrition-table-row-name"}>
									<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Protein</p>
								</td>
								<td className={"recipe__nutrition-table-row-value"}>
									<p
										className={
											"recipe__paragraph recipe__paragraph_weight_700 recipe__paragraph_margin_0px recipe__paragraph_color_brandy-red"
										}
									>
										20g
									</p>
								</td>
							</tr>
							<tr className={"recipe__nutrition-table-row"}>
								<td className={"recipe__nutrition-table-row-name"}>
									<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>Fat</p>
								</td>
								<td className={"recipe__nutrition-table-row-value"}>
									<p
										className={
											"recipe__paragraph recipe__paragraph_weight_700 recipe__paragraph_margin_0px recipe__paragraph_color_brandy-red"
										}
									>
										22g
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</article>
	);
};

export { Recipe };
