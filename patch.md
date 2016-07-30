Patch
=====

1. Apply this patch (needed until Angular-CLI migrated to `core-js` from `es6-shim`) 

  edit `node_modules/angular-cli/lib/broccoli/angular2-app.js`
  
  at line *36*, replace 
  ```js
    'vendor/es6-shim/es6-shim.js',
    'vendor/reflect-metadata/Reflect.js',
    'vendor/systemjs/dist/system.src.js',
    'vendor/zone.js/dist/zone.js'
  ```
  
  with
  ```ks
    'vendor/core-js/client/shim.min.js',
    'vendor/systemjs/dist/system.src.js',
    'vendor/zone.js/dist/zone.js'
  ```

2. Remove typings

  edit `node_modules/angular-cli/lib/broccoli/angular2-app.js`
  
  at line *92*, comment out this line
  
  ```js
  // new BroccoliFunnel('typings', { destDir: 'typings' }),
  ```

3. Remove nested old typescript

  `node_modules/angular-cli/node_modules/typescript`
