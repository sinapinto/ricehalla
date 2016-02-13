import autoprefixer from 'autoprefixer';

export default function postcss() {
  return [
    autoprefixer({ browsers: ['last 2 versions', 'IE > 8'] })
  ];
}
