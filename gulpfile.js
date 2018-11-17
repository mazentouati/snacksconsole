global.destDir = './dist';
global.srcDir = './src';

const
  gulp          = require('gulp'),
  browserSync   = require('browser-sync').create()

  buildSASS     = require('./tasks/build/sass'),
  buildJS       = require('./tasks/build/js'),
  buildHTML     = require('./tasks/build/html'),
  buildStatic   = require('./tasks/build/static'),

  exportJS      = require('./tasks/export/js'),
  exportHTML    = require('./tasks/export/html'),
  exportStatic  = require('./tasks/export/static'),
  exportCSS     = require('./tasks/export/css')
;

gulp.task('export', function() {
  exportJS();
  exportHTML();
  exportCSS();
  exportStatic();
});

gulp.task('export:js', exportJS);
gulp.task('export:html', exportHTML);
gulp.task('export:static', exportStatic);
gulp.task('export:css', exportCSS);

gulp.task('build:sass', buildSASS);
gulp.task('build:js', buildJS);
gulp.task('build:html', buildHTML);
gulp.task('build:static', buildStatic);

gulp.task('build', function() {
  buildSASS();
  buildJS();
  buildHTML();
  buildStatic();
});

gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: ['./dist/'],
    },
    notify: false,
    ui: false,
    open: false,
    injectChanges: true,
  });

  gulp.watch('./src/scss/**/*', ['reload:sass']);
  gulp.watch('./src/js/**/*', ['reload:js']);
  gulp.watch('./src/html/**/*', ['reload:html']);

});

gulp.task('reload:sass', function () {
  buildSASS().on('end', function() {
    browserSync.reload();
  });
});

gulp.task('reload:js', function () {
  buildJS().on('end', function() {
    browserSync.reload();
  });
});

gulp.task('reload:html', function () {
  buildHTML().on('end', function() {
    browserSync.reload();
  });
});
