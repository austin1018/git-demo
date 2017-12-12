

/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 混淆 压缩
 * 3. IMG 复制
 * 4. HTML 压缩
 */

// 在gulpfile中先载入gulp包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

// 1. LESS编译 压缩 合并
// gulp.task('default', function() {
// 	console.log('Test');
// 	// 执行style任务时自动执行
// 	// gulp.src('src/style/*.less').pipe(less()).pipe(gulp.dest('dist/styles'));
// 	// console.log('Hello');
// })；

// 1. LESS编译 压缩 
gulp.task('style', function() {
	// 执行style任务时自动执行
	gulp.src(['src/styles/*.less','!src/styles/demo.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

 
// 2. JS合并 混淆 压缩
gulp.task('script', function() {
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// 3. IMG 复制
gulp.task('image', function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// 4. HTML 压缩
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});


gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: ['dist']
		}
	}, 
	function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);

})
