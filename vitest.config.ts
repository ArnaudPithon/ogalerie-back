import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // pour utiliser describe/it sans import
    environment: "node", // pour API/Express (pas jsdom)
    coverage: {
      provider: "v8",
      reporter: ["text", "html"], // rapports pratiques
    },
  },
});
