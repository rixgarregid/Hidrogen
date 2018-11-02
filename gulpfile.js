const gulp = require('gulp')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')

const stylusCompilePath = './static/styles/hidrogen.styl'
const stylusWatchPath = './static/styles/**/*.styl'

gulp.task('build:stylus', () =>
    gulp.src(stylusCompilePath)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('./static/styles/'))
)

gulp.task('build', () => ['build:stylus'])

gulp.task('watch', () => {
    gulp.watch(stylusWatchPath, ['build:stylus'])
})

gulp.task('default', () => ['build'])
