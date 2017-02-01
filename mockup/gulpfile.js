const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const autoprefix = require('gulp-autoprefixer');
const del = require('del');
const pug	= require('gulp-pug');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('*.*').on('change', reload);
});

gulp.task('default', ['deploy']);
