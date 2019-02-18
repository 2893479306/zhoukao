var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require("gulp-clean-css");
gulp.task("sev", function() {
    return gulp.src("../css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("../css"))
})
gulp.task("watch", function() {
    gulp.watch("../css/*.scss", gulp.series("sev"));
})
gulp.task("server", function() {
    return gulp.src("../")
        .pipe(server({
            open: true,
            port: 2020,
            livereload: true
        }))
})
gulp.task("uglify", function() {
    return gulp.src("../js/{index,a}.js")
        .pipe(concat("all.js"))
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(uglify())
        .pipe(gulp.dest("../dist/js"))

})
gulp.task("sas", function() {
    return gulp.src("../css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("../dist/css"))

})
gulp.task("default", gulp.series("sev", "server", "uglify", "watch"))
gulp.task("build", gulp.series("sas", "uglify"))