import { FC } from "react";

import { Recipe } from "../entities/recipe";

import "./index.scss";

const App: FC = () => {
	return (
		<main>
			<Recipe />
		</main>
	);
};

export default App;
