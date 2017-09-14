const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("app", function() {
    gulp.src("client/scss/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(gulp.dest("./public/js/"))
});

//Watch task
gulp.task("default",function() {
    gulp.watch("client/scss/**/*.scss",["app"]);
});
