import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      nodeResolve({
        dedupe: [ 'react', 'react-dom' ],
        jsnext: true
      }),
      commonjs(),
      typescript({ objectHashIgnoreUnknownHack: false }),
    ],
    external: ['react', 'react-dom'],
    
  }