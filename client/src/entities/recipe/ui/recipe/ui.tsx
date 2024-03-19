import { FC } from "react";

const Recipe: FC = () => {
	return (
		<article className={"recipe"}>
			<picture className={"recipe__image"}>
				<source srcSet={""} />
				<img src={""} alt={""} />
			</picture>
			<h2 className={"recipe__title"}>Simple Omelette Recipe</h2>
			<p className={"recipe__paragraph"}>
				An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs
				cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.
			</p>
			<div className={"recipe__preparation-time"}>
				<h3 className={"recipe__subtitle"}>Preparation time</h3>
				<ul className={"recipe__preparation-time-list"}>
					<li className={"recipe__preparation-time-list-item"}>Total: Approximately 10 minutes</li>
					<li className={"recipe__preparation-time-list-item"}>Preparation: 5 minutes</li>
					<li className={"recipe__preparation-time-list-item"}>Cooking: 5 minutes</li>
				</ul>
			</div>
			<div className={"recipe__ingredients"}>
				<h3 className={"recipe__subtitle"}>Ingredients</h3>
				<ul className={"recipe__ingredients-list"}>
					<li className={"recipe__ingredients-list-item"}>2-3 large eggs</li>
					<li className={"recipe__ingredients-list-item"}>Salt, to taste</li>
					<li className={"recipe__ingredients-list-item"}>Pepper, to taste</li>
					<li className={"recipe__ingredients-list-item"}>1 tablespoon of butter or oil</li>
					<li className={"recipe__ingredients-list-item"}>
						Optional fillings: cheese, diced vegetables, cooked meats, herbs
					</li>
				</ul>
			</div>
			<div className={"recipe__instructions"}>
				<h3 className={"recipe__subtitle"}>Instructions</h3>
				<ol className={"recipe__instructions-list"}>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>
							Beat the eggs:
						</strong>
						<p className={"recipe__paragraph"}>
							In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed.
							You can add a tablespoon of water or milk for a fluffier texture.
						</p>
					</li>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>
							Heat the pan:
						</strong>
						<p className={"recipe__paragraph"}>
							Place a non-stick frying pan over medium heat and add butter or oil.
						</p>
					</li>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>
							Cook the omelette:
						</strong>
						<p className={"recipe__paragraph"}>
							Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the
							eggs evenly coat the surface.
						</p>
					</li>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>
							Add fillings (optional):
						</strong>
						<p className={"recipe__paragraph"}>
							When the eggs begin to set at the edges but are still slightly runny in the middle,
							sprinkle your chosen fillings over one half of the omelette.
						</p>
					</li>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>
							Fold and serve:
						</strong>
						<p className={"recipe__paragraph"}>
							As the omelette continues to cook, carefully lift one edge and fold it over the
							fillings. Let it cook for another minute, then slide it onto a plate.
						</p>
					</li>
					<li className={"recipe__instructions-list-item"}>
						<strong className={"recipe__paragraph recipe__paragraph_weight_strong"}>Enjoy:</strong>
						<p className={"recipe__paragraph"}>
							Serve hot, with additional salt and pepper if needed.
						</p>
					</li>
				</ol>
			</div>
			<div className={"recipe__nutrition"}>
				<h3 className={"recipe__subtitle"}>Nutrition</h3>
				<p className={"recipe__paragraph"}>
					The table below shows nutritional values per serving without the additional fillings.
				</p>
				<table className={"recipe__nutrition-table"}>
					<tbody className={"recipe__nutrition-table-body"}>
						<tr className={"recipe__nutrition-table-row"}>
							<td className={"recipe__nutrition-table-row-name"}>Calories</td>
							<td className={"recipe__nutrition-table-row-value"}>277kcal</td>
						</tr>
						<tr className={"recipe__nutrition-table-row"}>
							<td className={"recipe__nutrition-table-row-name"}>Carbs</td>
							<td className={"recipe__nutrition-table-row-value"}>0g</td>
						</tr>
						<tr className={"recipe__nutrition-table-row"}>
							<td className={"recipe__nutrition-table-row-name"}>Protein</td>
							<td className={"recipe__nutrition-table-row-value"}>20g</td>
						</tr>
						<tr className={"recipe__nutrition-table-row"}>
							<td className={"recipe__nutrition-table-row-name"}>Fat</td>
							<td className={"recipe__nutrition-table-row-value"}>22g</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
	);
};

export { Recipe };
