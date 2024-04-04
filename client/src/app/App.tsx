import { FC } from "react";

import { Recipe } from "@entities/recipe/ui";

import "./styles/styles.scss";

const App: FC = () => {
	return (
		<main className={"recipe-page"}>
			<h1 className={"visually-hidden"}>Recipe page</h1>
			<Recipe />
		</main>
	);
};

export default App;
