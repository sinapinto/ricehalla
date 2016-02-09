import postcssImport from 'postcss-import';
import customProps from 'postcss-custom-props';
import calcFunction from 'postcss-calc-function';
import autoprefixer from 'autoprefixer';

export default function postcss() {
  return [
    postcssImport({
      onImport: files => files.forEach(this.addDependency)
    }),
    customProps(),
    calcFunction(),
    autoprefixer({ browsers: ['last 2 versions', 'IE > 8'] })
  ];
}
