import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(root),
			"@app": resolve(root, "app"),
			"@entities": resolve(root, "entities"),
			"@entities/recipe": resolve(root, "entities/recipe"),
			"@entities/recipe/ui": resolve(root, "entities/recipe/ui"),
			"@entities/recipe/api": resolve(root, "entities/recipe/api"),
			"@entities/recipe/model": resolve(root, "entities/recipe/model")
		}
	}
});
