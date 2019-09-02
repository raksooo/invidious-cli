import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('./package.json');

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default {
  input: 'src/index.ts',
  external: ['fs', 'path', ...Object.keys(pkg['dependencies'])],
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      exclude: [ 'node_modules/**' ],
      presets: [
        "@babel/preset-env",
        "@babel/typescript",
        "@babel/preset-react",
      ]
    }),
    //uglify(),
  ],
  output: [{
    format: 'cjs',
    file: pkg['main']
  }]
};

