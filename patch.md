Patch
=====

Apply this patch (needed until Angular-CLI migrated to `core-js` from `es6-shim`) 

edit `node_modules/angular-cli/lib/broccoli/angular2-app.js`

at line *36*, replace 
```
  'vendor/es6-shim/es6-shim.js',
  'vendor/reflect-metadata/Reflect.js',
  'vendor/systemjs/dist/system.src.js',
  'vendor/zone.js/dist/zone.js'
```

with
```
  'vendor/core-js/client/shim.min.js',
  'vendor/systemjs/dist/system.src.js',
  'vendor/zone.js/dist/zone.js'
```
