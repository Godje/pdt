const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");

	
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
		.pipe(gulp.dest("website-assets/css"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("watch", ["browserSync", "sass"], ()=>{
	gulp.watch("website-assets/scss/**/*.scss", ["sass"]);
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
