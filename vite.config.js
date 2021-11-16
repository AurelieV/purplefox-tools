const path = require("path");
import vue from "@vitejs/plugin-vue";
const { defineConfig } = require("vite");

module.exports = defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "lib/main.js"),
            name: "PurplefoxTools",
            fileName: (format) => `purplefox-tools.${format}.js`,
        },
        rollupOptions: {
            external: ["vue", "vue-router", "@iconify/vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
