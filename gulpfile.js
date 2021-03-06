var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
  done();
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(cssnano({
        zindex: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', gulp.series(gulp.parallel('sass', 'browserSync'), 'watch', function(done){
  done();
}));

gulp.task('build', gulp.series('clean:dist', 'sass', gulp.parallel('useref', 'images', 'fonts')));