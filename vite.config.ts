import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      name: "gsCdnFlow",
      fileName: "bundle",
      formats: ["iife"]
    },
    outDir: "dist",
    // rollupOptions: {
    //   output: {
    //     format: "iife",
    //     entryFileNames: "bundle.js"
    //   }
    // }
  }
})
