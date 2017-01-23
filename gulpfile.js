var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    neat         = require('node-neat').includePaths,
    concat       = require("gulp-concat"),
    watch        = require("gulp-watch"),
    plumber      = require("gulp-plumber"),
    sourcemaps   = require('gulp-sourcemaps'),
    minify_css   = require("gulp-minify-css"),
    postcss      = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    bower        = require('gulp-bower'),
    babel        = require("gulp-babel"),
    uglify       = require('gulp-uglify'),
    cleancss     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    gulpWebpack  = require('gulp-webpack'),
    webpackStream = require('webpack-stream');
    browserSync  = require('browser-sync').create();

    var gutil = require("gulp-util");
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");

//------------------------------------------------------------

var dest_js = "assets/js/build";
var src_js = "assets/js/app/**/*.js";
var src_webpack = "assets/js/app/index.js";
var dest_css = "assets/css";
var src_css = "assets/css/*.css";
var src_sass = "assets/scss/**/*.scss";

var indexFile = "index.php";
var base = {base: './'};
var dist = "./dist";
var processors = [
   autoprefixer({browsers:['last 2 version']})
];

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);


//------------------------------------------------------------

gulp.task('webpack', function() {
    return gulp.src(src_webpack)
        .pipe(gulpWebpack( require('./webpack.config.js')))
        .pipe(gulp.dest(dest_js));
});

//------------------------------------------------------------
// run js
gulp.task('js',function(){
    gulp.src(src_js)
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(webpack())
        .pipe(sourcemaps.write("."))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest_js))
        .pipe(browserSync.stream())
});
//------------------------------------------------------------

// only save style scss
gulp.task('sass', function(){
   return gulp.src(src_sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'nested',
        includePaths: ['node_modules/susy/sass'].concat(neat),
    }))
    .pipe(postcss(processors))
    .pipe(concat('style.min.css'))
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest_css))
    .pipe(browserSync.stream());
});
//------------------------------------------------------------
gulp.task('serve', ['sass','webpack'], function() {

    browserSync.init({
        proxy: "http://localhost/app/"
    });

    gulp.watch(src_sass, ['sass']).on('change', browserSync.reload);
    gulp.watch(src_js, ['webpack']).on('change', browserSync.reload);
    gulp.watch("*.php").on('change', browserSync.reload);
});
//------------------------------------------------------------

gulp.task('default', ['serve']);
