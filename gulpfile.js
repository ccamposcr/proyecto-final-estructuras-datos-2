var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    watch        = require('gulp-watch'),
    browserSync  = require('browser-sync').create(),
    runSequence  = require('run-sequence');

//reload the browserSync instance
var reloadBrowsers = function(){
  return browserSync.reload();
};

var executeTask = function(args) {
  return runSequence.apply({}, args);
}

//executes the tasks on the args array and calls to reloadBrowsers task at the end
var executeTaskAndReload = function(args){
  args.push('reloadBrowsers');
  return executeTask(args);
}

// Static server
var server = function() {
  browserSync.init({
    server: './src'
  });

  //watch for changes on scss
  watch('./src/scss/**/**/*.scss', executeTaskAndReload.bind(null, ['sass']));
};

var sass_task = function() {
  return gulp
          .src('./src/scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'compressed',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                      browsers: ['last 2 versions', 'last 4 iOS versions', 'ie >= 10'],
                      cascade: false
                    })
                  )
                .pipe(gulp.dest('./src/css/'));
};

var watch_task = function(){
  watch('./src/scss/**/*.scss', sass_task);
};

gulp.task('watch', watch_task );
gulp.task('sass', sass_task );
gulp.task('server', server);
gulp.task('reloadBrowsers', reloadBrowsers);


gulp.task('build', ['sass'] );
gulp.task('default', ['build','server']);