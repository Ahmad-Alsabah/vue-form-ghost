
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/directive.js',
  output: {
    file: 'dist/vue-form-ghost.min.js',
    format: 'umd',
    name: 'VueFormGhost',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    resolve(),
    terser()
  ]
}
