var gulp = require('gulp');
var sass = require('gulp-sass');
var insert = require('gulp-insert');
var prefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var using = require('gulp-using');
var gulpif = require('gulp-if');
var bless = require('gulp-bless');
var replace = require('gulp-replace');

var config = require('../config');
var banner = require('../utils/banner');
var logger = require('../utils/logger');

gulp.task('sass', ['sass:dev']);

gulp.task('sass:dev', function() {

  return gulp.src(config.sass.src)
    .pipe(plumber(function(err) {
      logger.error(err.message);
      this.emit('end');
    }))
    .pipe(less())
    .pipe(replace(config.regex.select[0], config.regex.select[1]))
    // .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(prefixer({
      browsers: config.sass.browsers
    }))
    .pipe(insert.prepend(banner() + '\n'))
    // .pipe(sourcemaps.write(config.less.destMaps))
    .pipe(bless({
      imports: true
    }))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(gulpif(config.args.verbose, using({prefix:'Task [sass:dev] using'})))
    .pipe(reload({ stream:true }));
});

