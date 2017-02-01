/**
 * DEV COMMANDS
 */

/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const gulp = require('gulp')
const nmon = require('gulp-nodemon')
const sass = require('gulp-sass')

/**************************************************************
 * DEFAULT TASK
 *************************************************************/

gulp.task('default', ['dev', 'sass:watch'])

/**************************************************************
 * CONVERT SASS TO CSS
 *************************************************************/

gulp.task('sass', () => {
    return gulp.src('app/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css'))
})

/**************************************************************
 * WATCHERS
 *************************************************************/

gulp.task('sass:watch', () => {
    gulp.watch('app/assets/sass/*.sass', ['sass'])
})

gulp.task('dev', () => {
    nmon({script: 'server.js'})
})


