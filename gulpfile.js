var gulp          = require('gulp');
var connect       = require('gulp-connect'); 
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');

gulp.task('html', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src('src/css/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  return browserify({ entries: './src/main.js', debug: true })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(connect.reload());
});

gulp.task('watch', ['build'], function(){
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.js',   ['js']);
  gulp.watch('src/**/*.scss', ['css']);
});

gulp.task('connect', ['build'], function(){
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
});

gulp.task('build', ['html', 'js', 'css']);
gulp.task('default', ['connect', 'watch']);
