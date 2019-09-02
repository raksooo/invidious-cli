import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import rootImport from 'rollup-plugin-root-import';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  external: ['fs', 'path', ...Object.keys(pkg['dependencies'])],
  plugins: [
    rootImport({
      root: [`${__dirname}/src`],
      extensions: ['.js', '.jsx', '']
    }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      exclude: [ 'node_modules/**' ]
    }),
    //uglify(),
  ],
  output: [{
    format: 'cjs',
    file: pkg['main']
  }]
};

