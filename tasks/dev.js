/**************************************************************
 * DEPENDENCIES
 *************************************************************/

import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import nmon from 'gulp-nodemon'
import cleanCSS from 'gulp-clean-css'
import htmlmin from 'gulp-htmlmin'
import child_process from 'child_process'
const exec = child_process.exec

/**************************************************************
 * TASKS
 *************************************************************/

gulp.task('default', [
    'nodemon',
    'babel:watch',
    'assets:watch',
    'webpack:watch'
])

gulp.task('nodemon', ['babel'], () => {
    nmon({script: 'app/server.js'})
})

gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('app'))
})

gulp.task('babel:watch', () => {
    gulp.watch(['src/**/*.js', '!src/assets/js/*.js'], ['babel'])
})

gulp.task('sass', () => {
    return gulp.src('src/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'))
})

gulp.task('css', ['sass'], () => {
    return gulp.src('src/assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/assets/css'))
})

gulp.task('html', () => {
    return gulp.src('src/assets/html/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('app/assets/html'))
})

gulp.task('assets:watch', () => {
    gulp.watch([
        'src/assets/**/*.*',
        '!src/assets/js/**/*.*'
    ], ['html', 'css'])
})

gulp.task('webpack', (cb) => {
    exec('webpack', (err, stdout, stderr) => {
        console.log(stderr)
        console.log(stdout)
        cb(err)
    })
})

gulp.task('webpack prod', (cb) => {
    exec('webpack -p', (err, stdout, stderr) => {
        console.log(stderr)
        console.log(stdout)
        cb(err)
    })
})

gulp.task('webpack:watch', () => {
    gulp.watch('src/assets/js/**/*.*', ['webpack'])
})