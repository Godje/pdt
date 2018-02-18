const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");

	
// Fix stop watch on error
function skipError(err){
	console.log(err.toString());
	this.emit("end");
}

// Compile SCSS into CSS
gulp.task("sass", function(){
	return gulp.src("website-assets/scss/styles.scss")
		.pipe(sass()) // Converts SCSS to CSS
		.on("error", skipError)
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: "ie8"}))
		.pipe(gulp.dest("website-assets/css"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("js", function(){
	return gulp.src("website-assets/js/**/*.js")
		.pipe(babel({
			presets: ["env"]
		}))
		.pipe(uglify())
		.pipe(concat("client.min.js"))
		.pipe(gulp.dest("website-assets/"));
});

gulp.task("watch", ["browserSync", "sass", "js"], ()=>{
	gulp.watch("website-assets/scss/**/*.scss", ["sass"]);
	gulp.watch("website-assets/js/**/*.js", ["js"]);
	gulp.watch("./index.html", browserSync.reload);
	gulp.watch("website-assets/js/**/*.js", browserSync.reload);
});


gulp.task("browserSync", function(){
	browserSync.init({
		server: {
			baseDir: "."
		}
	})
});
