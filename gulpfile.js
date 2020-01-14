const gulp = require('gulp')
const gulpConnect = require('gulp-connect') // server menggunakan gulp
const gulpConcat = require('gulp-concat') // untuk menggabungkan beberapa file javascript.
const gulpUglify = require('gulp-uglify') // untuk minify fule Javascript
const gulpMinifyCss = require('gulp-minify-css') // untuk minify file CSS;
const gulpHtmlmin = require('gulp-htmlmin') // untuk minify file HTML;

gulp.task('sayHello', async () => {
    console.log('Hello Gulp')
})

gulp.task('server', async () =>{
    gulpConnect.server({
        root:"dist",
        livereload:true
    })
})

//taks untuk minify
//css
gulp.task('minify-css', async () =>{
    gulp.src('./src/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulpConnect.reload())
})

//js
gulp.task('minify-js', async () => {
    gulp.src(['./src/js/*.js'])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify().on('error', (e) =>{
            console.log(e);
            
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload())
})

//html
gulp.task('minify-html', async () => {
    gulp.src('./src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload())
})

//gulp watch
gulp.task('watch', async () =>{
    gulp.watch('./src/js/*.js',gulp.series('minify-js'));
    gulp.watch('./src/css/*.css',gulp.series('minify-css'));
    gulp.watch('./src/*.html',gulp.series('minify-html'));
})


gulp.task('default', gulp.series('watch','server'))
