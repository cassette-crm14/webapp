/**
 * Created by jerek0 on 06/05/2015.
 */
var changed    = require('gulp-changed');
var gulp       = require('gulp');
var config     = require('../config').data;
var browserSync  = require('browser-sync');

gulp.task('data', function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});