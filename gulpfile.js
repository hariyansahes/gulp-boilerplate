
var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var postcss   = require('gulp-postcss');
var lost      = require('lost');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var autoprefixer = require('autoprefixer');

var sourcePaths = {
  styles: ['scss/**/*.scss']
};

var distPaths = {
  styles: 'css'
};

var server = {
  host: 'localhost',
  port: '8282'
}

gulp.task('sass', function () {

  var processors = [
    lost,
    autoprefixer({browsers: ['last 2 versions']})
  ];


  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['sass']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);