import { build, defineConfig } from "vite";
import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";

function removeVideoDir() {
  return {
    name: "remove-video-dir",
    renderStart(outputOptions, inputOptions) {
      const outDir = outputOptions.dir;
      const videoDir = path.resolve(outDir, "video");
      fs.rm(videoDir, { recursive: true }, () =>
        console.log(`Deleted ${videoDir}`)
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeVideoDir()],
  build: {
    lib: {
      entry: path.resolve("src", "component/index.ts"),
      name: "React Interactive Video",
      formats: ["es", "umd"],
      fileName: (format) => `react-interactive-video.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
