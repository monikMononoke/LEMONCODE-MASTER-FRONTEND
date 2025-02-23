import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [typescript()],
    },
    target: "es5",
  },
});
