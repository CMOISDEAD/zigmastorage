import path from "path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/main.ts"),
      name: "zigmastorage",
      fileName: (format) => `zigmastorage.${format}.js`,
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
