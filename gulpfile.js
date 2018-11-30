const gulp = require('gulp')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')

const paths = {
  styles: {
    compile: './styles/hidrogen.styl',
    watch:   './styles/**/*.styl',
    dest:    './styles/'
  }
}

gulp.task('styles:compile', () =>
  gulp
    .src(paths.styles.compile)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest(paths.styles.dest))
)

gulp.task('styles:watch', () =>
  gulp.watch(paths.styles.watch, gulp.series('styles:compile'))
)
