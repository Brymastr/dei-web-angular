var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('./styles/*.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest('./styles/'))
    .pipe(plugins.livereload());
});

gulp.task('html', function() {
  return gulp.src('./views/*.html')
    .pipe(plugins.livereload());
});


gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./views/*.html', ['html']);
  gulp.watch([
    './controllers/*.js',
    './directives/*.js',
    './models/*.js',
    './scripts/*.js',
    './config/*.js',
    './tasks/*.js'
  ], []);
});


gulp.task('serve', function() {
  plugins.nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {'NODE_ENV' : 'development'}
  })
});

gulp.task('run', ['styles', 'html', 'serve', 'watch']);