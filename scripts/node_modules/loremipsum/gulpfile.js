var gulp = require('gulp'),
babel = require('gulp-babel');

var config = {
  src: {
    js: './src/index.js'
  },
  dest: {
    js: 'dist'
  }
};

gulp.task('watch', ['build'], function() {
  gulp.watch(config.src.js, ['js']);
});

gulp.task('js', function () {
  return gulp.src(config.src.js)
  .pipe(babel())
  .pipe(gulp.dest(config.dest.js));
});;

gulp.task('build', ['js']);
gulp.task('default', ['watch']);
