var gulp = require('gulp');
var rename = require("gulp-rename");
var browserify = require('gulp-browserify');
var ghPages = require('gulp-gh-pages');



gulp.task('toweb', function() {
    // Single entry point to browserify 
    gulp.src('web/main.js')
        .pipe(browserify())
        .pipe(rename("scheme.js"))
        .pipe(gulp.dest('./web'))
});

gulp.task('index', function() {
  gulp.src('./web/index.swig')
    .pipe(swig({root_url: "locahost:4000"}))
    .pipe(gulp.dest('./dist/index.html'))
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});



// gulp debug
// gulp build combine all files

gulp.task('default', ['toweb']);
