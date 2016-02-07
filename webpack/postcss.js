import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

export default function postcss() {
  return [
    postcssImport({
      onImport: files => files.forEach(this.addDependency)
    }),
    autoprefixer({ browsers: ['last 2 versions', 'IE > 8'] })
  ];
}
