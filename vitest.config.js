const { defineConfig } = require("vitest/config");
const vue = require("@vitejs/plugin-vue");
const path = require("path");

module.exports = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{js,vue}"],
      exclude: [
        "src/main.js",
        "src/App.vue",
        "src/router/**",
        "src/views/AboutView.vue",
        "src/components/HelloWorld.vue",
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});
