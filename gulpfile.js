var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var bulkSass = require('gulp-sass-bulk-import');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var run = require('run-sequence');
var rigger = require('gulp-rigger');
var mqpacker = require('css-mqpacker');
var postcss = require("gulp-postcss");
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var cache = require('gulp-cache');
var spritesmith = require('gulp.spritesmith');
var ghpages = require('gulp-gh-pages');
var stylelint = require('stylelint');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var validate = require('gulp-w3c-css');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var csscomb = require('gulp-csscomb');
var eslint = require('gulp-eslint');

gulp.task('html', function () {
    gulp.src('app/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('build')) //Выгружаем результат в папку build
        .pipe(browserSync.reload({
            stream: true
        })) //И перезагрузим наш сервер для обновлений
});
gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src(['app/sass/**/*.scss', '!app/sass/libs/**/*', '!app/sass/libs']) // Берем источник
        .pipe(bulkSass()).pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(postcss([
      require('autoprefixer')
    ])).pipe(cssnano()) // Сжимаем
        .pipe(rename({
            suffix: '.min'
        })) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css')) // Выгружаем результата в папку build/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});
gulp.task('libs-css', function () { // Создаем таск "libs-css"
    return gulp.src('app/sass/libs/**/*') // Берем источник
        .pipe(rename({
            suffix: '.min'
        })) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css/libs')) // Выгружаем результата в папку build/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});
gulp.task('comb', function () {
  return gulp.src('app/sass/**/*scss')
    .pipe(csscomb())
    .pipe(gulp.dest('app/sass/'));
});
gulp.task('image', function () {
    return gulp.src(['app/img/**/*', '!app/img/sprite/**/*', '!app/img/sprite'])
        .pipe(imagemin([
    imagemin.gifsicle({
            interlaced: true
        })

        , imagemin.jpegtran({
            progressive: true
        })

        , imagemin.optipng({
            optimizationLevel: 5
        })

        , imagemin.svgo({
              plugins: [
                {
                    optimizationLevel: 5
        }
        , {
                    progressive: true
        }
        , {
                    interlaced: true
        }
        , {
                    removeViewBox: false
        }
, //          { removeUselessStrokeAndFill: true },
                {
                    cleanupIDs: false
        }
        , {
                    cleanupAttrs: true
        }
        , {
                    removeMetadata: true
        }
        , {
                    removeTitle: true
        },
                  {
                   removeComments: true   
                  }
, //          { removeAttrs: { attrs: '(fill|stroke|data-name)' } },
        ]
        })
]))
    .pipe(gulp.dest('build/img')).pipe(browserSync.reload({
        stream: true
    }))
});
//gulp.task('fonts', function () {
//    return gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts'))
//});
gulp.task('scripts', function () {
    return gulp.src(['app/js/**/*', '!app/js/libs/**/*', '!app/js/libs']) //при необходимости указываем нужные файлы библиотек
        .pipe(plumber()).pipe(concat('main.min.js')).pipe(uglify()).pipe(gulp.dest('build/js')).pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('libs', function () {
    return gulp.src('app/js/libs/**/*').pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('build/js/libs')).pipe(browserSync.reload({
        stream: true
    }))
});
gulp.task('symbols', function () {
    return gulp.src('app/icons/*.svg').pipe(imagemin([
      imagemin.svgo({
            plugins: [
                {
                    optimizationLevel: 3
        }
        , {
                    progressive: true
        }
        , {
                    interlaced: true
        }
        , {
                    removeViewBox: false
        }
, //          { removeUselessStrokeAndFill: true },
                {
                    cleanupIDs: false
        }
        , {
                    cleanupAttrs: true
        }
        , {
                    removeMetadata: true
        }
        , {
                    removeTitle: true
        }
,
                {
                   removeComments: true   
                  }
,//          { removeAttrs: { attrs: '(fill|stroke|data-name)' } },
        ]
        , })
    , ])).pipe(svgstore({
        inlineSvg: true
    })).pipe(rename('svg-sprite.svg')).pipe(gulp.dest('build/img')).pipe(browserSync.reload({
        stream: true
    }))
});
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/img/sprite/*').pipe(spritesmith({
        imgName: 'png-sprite.png'
        , cssName: 'png-sprite.css'
        , algorithm: 'binary-tree'
        , padding: 2
    }));
    spriteData.img.pipe(gulp.dest('build/img'));
    spriteData.css.pipe(gulp.dest('build/css'));
});
gulp.task('ghpages', function () {
    gulp.src('build/**/*').pipe(ghpages([{
        options: Object
  }]))
});
gulp.task('lint', function () {
    gulp.src('app/sass/**/*.scss').pipe(postcss([
      stylelint()
      , require('postcss-reporter')({
            clearAllMessages: true
        , })
    , ], {
        syntax: require('postcss-scss')
    }))
});
gulp.task('clean', function () {
    return del('build/**/*')
});
gulp.task('build', function (fn) {
  run('clean', 'html', 'comb', 'sass', 'libs-css', 'scripts', 'libs', 'symbols', 'sprite', 'image', 'copy', 'favicon-markups', fn)
});
gulp.task('deploy', function () {
    run('build', 'ghpages')
});
gulp.task('copy', function () {
    gulp.src('app/static/**/*').pipe(changed('build')).pipe(gulp.dest('build/static'))
});
gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - build
        }
        , notify: false // Отключаем уведомления
    });
});
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/sass/libs/**/*', ['libs-css']); 
    gulp.watch('app/**/*.html', ['html']); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
    gulp.watch('app/js/libs/**/*', ['libs']);
    gulp.watch('app/img/**/*', ['image']);
    gulp.watch('app/icons/**/*', ['symbols'])
});
gulp.task('default', function () {
    run('build', ['watch'])
});
var FAVICON_DATA_FILE = 'faviconData.json';
gulp.task('favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'favicon.svg',
		dest: 'app/static/favicons',
		iconsPath: 'static/favicons',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#f57de3',
                margin: '14%',
				assets: {
					ios6AndPriorIcons: true,
					ios7AndLaterIcons: true,
					precomposedIcons: true,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#f57de3',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: true,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: true
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#f57de3',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: true
				}
			},
            safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#f57de3'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

gulp.task('favicon-markups', function() {
	return gulp.src([ 'build/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('build'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['app/js/**/*', '!app/js/libs/**/*', '!app/js/libs'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});