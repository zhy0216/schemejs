var gulp = require('gulp');
var browserify = require('gulp-browserify');


gulp.task('toweb', function() {
    // Single entry point to browserify 
    gulp.src('scheme.js')
        .pipe(browserify())
        .pipe(gulp.dest('./web'))
});

gulp.task('index', function() {
  gulp.src('./web/index.swig')
    .pipe(swig({root_url: "locahost:4000"}))
    .pipe(gulp.dest('./dist/index.html'))
});


// gulp debug
// gulp build combine all files

gulp.task('default', ['toweb']);
