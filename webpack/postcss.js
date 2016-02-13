import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default function postcss() {
  return [
    postcssImport({
      onImport: files => files.forEach(this.addDependency)
    }),
    autoprefixer({ browsers: ['last 2 versions', 'IE > 8'] })
  ];
}
