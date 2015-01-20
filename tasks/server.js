'use strict';

let browserSync = require('browser-sync'),
  httpProxy = require('http-proxy');

/* This configuration allow you to configure browser sync to proxy your backend */
// ML API Dev http://dbsrt0490:8010/
// ML API Stage http://dbsrt0490:9010/  replica http://dbsrt0574:9010/
// ML API Stage for iBaags http://dbsrt0490:9020/  replica http://dbsrt0574:9020/
// JBoss API Dev http://apsed2427:8080/
let proxyTarget = 'http://dbsrt0490:9020/'; // The location of your backend
let proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

let proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

let proxyMiddleware = (req, res, next) => {
  if (req.url.indexOf(proxyApiPrefix) !== -1) {
    proxy.web(req, res);
  } else {
    next();
  }
};

let browserSyncInit = (baseDir, files, browser) => {
  browser = browser === undefined ? 'default' : browser;

  browserSync({
    files,
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      routes: {
        '/source': '/app'
      },
      middleware: proxyMiddleware
    },
    //ghostMode: false,
    browser: browser
  });

};

export default function server(gulp, cfg, args) {
  gulp.task('serve', gulp.parallel('watch', () => {
    browserSyncInit(
      [
        '.tmp',
        'app',
        './'
      ],
      [
        'app/**/*.html',
        'app/common/images/*'
      ]
    );
  }));

  gulp.task('serve:dist', gulp.series('default', () =>  {
    browserSyncInit('dist');
  }));

  gulp.task('serve:dist-speed', () =>  {
    browserSyncInit('dist');
  });

  gulp.task('serve:e2e', () => {
    browserSyncInit(['.tmp', 'app', './' ], null, []);
  });

  gulp.task('serve:e2e-dist', gulp.parallel('watch', () => {
    browserSyncInit('dist', null, []);
  }));
}
