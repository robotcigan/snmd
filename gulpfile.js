const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');
// const webp = require('gulp-webp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

swallowError = (error) => {
  console.log('error from swallow function -> ', error.toString());
  return this.emit('end');
};

gulp.task('stylus', function() {
  gulp.src('styles/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
        'include css': true
      }))
    .on('error', swallowError).pipe(autoprefixer({
      browsers: ['> 1%', 'last 5 version', 'IE 10'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/css/'))
    .pipe(reload({
      stream: true,
      match: '**/*.css'
    }));
});

gulp.task('es6', function() {
  gulp.src('js/*.js')
    .pipe(babel({
      presets: ['es2015']
    })).on('error', swallowError).pipe(gulp.dest('dist/js')).pipe(reload({
      stream: true
    }));
});

gulp.task('imagemin', function() {
  gulp.src('img/**/*').pipe(imagemin([
    imagemin.jpegtran({
      progressive: true
    })
  ], {
    verbose: true
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('dist/img'));
  gulp.src('img/**/*')
    .pipe(imagemin([
      webp({
        quality: 100
      })
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest('dist/img/webp'))
});

// gulp.task('webp', () => {
//   gulp.src('img/**/*')
//   .pipe(webp({
//     quality: 80,
//     preset: 'photo',
//     method: 6
//   }))
//   .pipe(gulp.dest('dist/img/webp'))
// })

gulp.task('pug', function() {
  gulp.src('*.pug').pipe(pug({
    pretty: true
  })).on('error', swallowError).pipe(gulp.dest('dist/'));
});

gulp.task('pug-watch', ['pug'], reload);

gulp.task('default', ['pug', 'stylus', 'imagemin', 'es6'], function() {
  browserSync({
    server: 'dist/',
    notify: false,
    open: false
  });
  gulp.watch('img/**/*', ['imagemin']);
  // gulp.watch('img/**/*', ['webp']);
  gulp.watch('js/*.js', ['es6']);
  gulp.watch('styles/**/*.styl', ['stylus']);
  gulp.watch('*.pug', ['pug-watch']);
});
