import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: [{
    file: "dist/pack.es.js",
    format: "es",
  }, {
    file: "dist/pack.commonjs.js",
    format: "cjs",
  },],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};