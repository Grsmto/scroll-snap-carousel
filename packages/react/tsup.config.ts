import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Adjust the entry point as needed
  format: ['cjs', 'esm'], // CommonJS and ES Module formats
  dts: true, // Generate TypeScript declaration files
  sourcemap: true, // Generate sourcemaps
  // minify: true, // Minify the output
  clean: true, // Clean the output directory before each build
  onSuccess: 'cp ../core/dist/styles.css dist/styles.css'
});
