import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { getRecipeQuery } from "@entities/recipe/api";
import { TRecipe } from "@entities/recipe/model";
import { Button as ReloadButton } from "@shared/ui";

import "./styles.scss";
import "react-loading-skeleton/dist/skeleton.css";

type RecipeState = "notLoading" | "loading" | "loaded" | "error";

const Recipe: FC = () => {
	const [reloadComponent, setReloadComponent] = useState<number>(Math.random());
	const [isRecipeLoading, setIsRecipeLoading] = useState<RecipeState>("notLoading");
	const [recipeData, setRecipeData] = useState<TRecipe>();

	useEffect(() => {
		(async () => {
			try {
				setIsRecipeLoading("loading");
				const recipeData = await getRecipeQuery();
				if (recipeData) setRecipeData(recipeData);
				setIsRecipeLoading("loaded");
			} catch (error) {
				setIsRecipeLoading("error");
				console.error("Error fetching data:", error);
			}
		})();
	}, []);

	const renderRecipe = () => (
		<article className={"recipe"}>
			<picture>
				<source media="(max-width:376px)" srcSet={recipeData?.images.mobile} />
				<source media="(min-width:377px)" srcSet={recipeData?.images.desktop} />
				<img
					className={"recipe__image"}
					src={recipeData?.images.desktop}
					alt={"Simple Omelette Recipe image"}
				/>
			</picture>
			<div className={"recipe__container"}>
				<h2 className={"recipe__title recipe__title_margin-bottom_16px"}>{recipeData?.title}</h2>
				<p className={"recipe__paragraph recipe__paragraph_margin-bottom_32px"}>
					{recipeData?.description}
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
								{recipeData?.preparationTime.total}
							</p>
						</li>
						<li className={"recipe__preparation-time-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								{recipeData?.preparationTime.preparation}
							</p>
						</li>
						<li className={"recipe__preparation-time-list-item"}>
							<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>
								{recipeData?.preparationTime.cooking}
							</p>
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
						{recipeData?.ingredients.map((ingredient, index) => (
							<li key={`${ingredient}-${index}`} className={"recipe__ingredients-list-item"}>
								<p className={"recipe__paragraph recipe__paragraph_margin_0px"}>{ingredient}</p>
							</li>
						))}
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
						{recipeData?.instructions.map(({ stepName, stepDescription }, index) => (
							<li key={`${stepName}-${index}`} className={"recipe__instructions-list-item"}>
								<strong className={"recipe__paragraph recipe__paragraph_weight_700"}>
									{stepName}
								</strong>
								<p
									className={
										"recipe__paragraph recipe__paragraph_margin_0px recipe__paragraph_display_inline"
									}
								>
									{stepDescription}
								</p>
							</li>
						))}
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
										{recipeData?.nutrition.calories}
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
										{recipeData?.nutrition.carbs}
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
										{recipeData?.nutrition.protein}
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
										{recipeData?.nutrition.fat}
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</article>
	);

	if (!recipeData) return null;

	return <>{isRecipeLoading === "loaded" && renderRecipe()}</>;
};

export { Recipe };
