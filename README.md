
SPA Starter Kit
=========

**SPA Starter Kit** is a Single Page Application (SPA) Starter project build with **AngularJS** , **AMD** and **ES6**
Demonstrate AngularJS Design Patterns and Best Practices.   

### Features

* Use ES6 and AMD everywhere to build a modular application.
* Adopts [AngularJS Style Guide](https://github.com/johnpapa/angularjs-styleguide/)
* Modular SASS inspired by [SMACSS](http://smacss.com/), CSS Autoprefixing
* Source Maps for CSS & JS supported with Gulp-SourceMaps
* Unit (karma) and e2e (protractor) tests works with your AMD/browserifyed code.
* Cross Browser CSS & HTML Injection with BrowserSync 
* Build environment (DEV, TEST, CI, PROD) aware gulp tasks. 
* Continue development and testing even when backend is not available. [gulp --env=TEST serve]
* Produce optimized, production ready bundles for deployment. 
* Achieve some of the Angular 2.0 goals while still running Angular 1.3.x


### Design Patterns 
* Authentication and Fine-grained Authorization
* Web Sockets, EventBus, Real-time REST API
* Resiliency - Retry, Fallback, Circuit-breaker(W.I.P)
* Caching as a Cross-Cutting Concern
* Pagination and querying selective fields from REST API
* Use ES6 Proxies and ES6+ annotations for AOP.
* Animations for rich user experience. 


### Getting Started

```bash
# Clone this repo
git clone https://github.com/xmlking/spa-starter-kit

# Install development tools at global location(one-time)
brew install node   # `node -v && npm -v` verify node installation. 
brew install ruby   # only install if it not installed already. Mac may already have it at `/usr/bin/ruby` 

npm install -g bower
npm install -g gulp
npm install -g karma-cli

# Install the dev dependencies for project, such as Karma, Traceur, etc.
npm install   # run  'npm install && npm prune' whenever you upgraded versions in package.json.

# Install runtime dependencies for project with bower.
bower install # run 'bower install && bower prune' whenever you upgraded versions in bower.json.

# Install SASS
[sudo] gem install sass # verify  `sass --version` > 3.3.0

# Start the server and watch for file changes to transpile ES6 files, live reload pages etc. 
gulp serve  # gulp --fatal=off serve # no errors should kill the live server.

# Build project: creates  `dist` directory for deployment to Web Servers. 
gulp --env=PROD # or NODE_ENV=PROD gulp  # `set NODE_ENV=PROD` and `gulp` for windows

# Other Gulp Commands
gulp or `gulp build`    # to build an optimized version of your application in /dist
gulp serve              # to launch a browser sync server on your source files
gulp serve:dist         # to launch a server on your optimized application
gulp wiredep            # to fill bower dependencies in your .html file(s)
gulp test               # to launch your unit tests with Karma
gulp protractor         # to launch your e2e tests with Protractor
gulp protractor:dist    # to launch your e2e tests with Protractor on the dist files
gulp deploy             # to deploy dist folder to gh-pages

# Maintenance 
npm update -g           #update all outdated global packages
npm update --save-dev   #update all outdated local packages (run from project directory) 
brew upgrade && brew doctor
brew upgrade node       #update to latest node version
```

### Running the [tests](./test/)
This will start Karma and Chrome
```bash
gulp test
```
Karma will watch the source code and run the tests anytime you save a change.
```bash
gulp tdd
```

### Backend-less frontend testing/development 
```bash
gulp --env=TEST serve
```
####You can also use this pre-build Grails App [apiApp.war](https://github.com/xmlking/grails-batch-rest/releases) as backend for this SPA App. 

### Options
By default, plugin errors will cause Gulp to halt. Errors and warnings are fatal. 
If you want to keep Gulp running, use the --fatal=off flag. 
```bash
gulp                  # defaults to fatal=error
gulp --fatal=error
gulp --fatal=warning
gulp --fatal=off      # no errors should kill the build
alias g='gulp --fatal=off --env=DEV' // tip for smooth development.
```
####Setting build environment variable for environment-specific gulp tasks: 
Application is by default set with production environment specific settings which can be overridden 
by adding environment specific angular modules (dev.env.js , test.env.js) to [index.js](./app/scripts/index.js) via Gulp command-line arguments.  
By default `templateCache` is disabled and `SourceMaps`, `type assertions` are enabled.  
```bash
gulp --env=PROD task   # or `NODE_ENV=PROD gulp task` : set `global.optimize = true`. This will disable SourceMaps,type assertions  and enable templateCache    
gulp --env=TEST task   # TEST mode for backend-less testing in CI env. data from [fixtures](./test/fixtures) will be served.
gulp --env=DEV  task   # DEV mode points to local backend URLs.
```

###Compatibility
The app was tested on:
 
  * Firefox (>= v31)
  * Chrome (>= v36), with the following flag enabled: `chrome://flags/#enable-javascript-harmony` (copy/paste into your address-bar)
  
### Tips
If you are behind firewall and want to force **Bower** to get files from `https://` instead of `git://`
```bash
git config --global url."https://".insteadOf git://
```
In case you want to revert that global configuration change
```bash
git config --global --unset url."https://".insteadOf
```
    
### For Windows Users
>Install [git](http://git-scm.com/downloads) client if needed.
Install node and above mentioned global node modules, them  
make sure system path has `C:\Program Files\nodejs\;C:\Users\<username>\AppData\Roaming\npm\`. 
Install [Ruby](http://rubyinstaller.org/downloads/) and make sure system path has it. 

How to delete the `node_modules` folder when Windows complains that file or path names are too long?
```bash
mkdir junk
robocopy junk node_modules /MIR
```
>The (empty) ‘junk’ folder can then be deleted in the normal way

### TODO
- [ ] Lazy Load Modules 
[Pending Proposal](https://groups.google.com/forum/#!topic/angular/w0ZEBz02l8s)
[ocLazyLoad](http://blog.getelementsbyidea.com/load-a-module-on-demand-with-angularjs/)
- [ ] offline-first pattern with Service Worker
 
### Credits
@nateabele @sindresorhus @silvenon @vojtajina @digisfera  @jonkemp @domenic @addyosmani @tvcutsem

