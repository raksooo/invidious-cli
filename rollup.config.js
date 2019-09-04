import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('./package.json');

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default {
  input: 'src/index.ts',
  output: [{
    format: 'cjs',
    file: pkg['main']
  }],
  external: ['fs', 'os', 'path', 'util', 'https', ...Object.keys(pkg['dependencies'])],
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      exclude: [ 'node_modules/**' ],
      presets: [
        ["@babel/preset-env", { "modules": false, "useBuiltIns": "usage", "corejs": 3 }],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
      ],
    }),
    commonjs(),
    uglify(),
  ],
};

