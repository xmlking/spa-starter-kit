
SPA Starter Kit
=========

**SPA Starter Kit** is a Single Page Application (SPA) Starter project built on **AngularJS** , **ReactJS** **AMD** and **ES6**

Demonstrate Front-end Design Patterns and Best Practices.

### Demo
This **[Demo](http://xmlking.github.io/spa-starter-kit/)** static gh-pages are produced by [Mocked Backend Workflow](#mocked-backend-workflow). 

### Features

* Use ES6 and AMD everywhere to build a modular application.
* Flat and modular project structure for parallel development. 
* Adopts AngularJS Style Guides from [johnpapa](https://github.com/johnpapa/angularjs-styleguide/), [gocardless](https://github.com/gocardless/angularjs-style-guide)
* Modular SASS inspired by [SMACSS](http://smacss.com/), CSS Autoprefixing
* [Material Design](https://github.com/angular/material) UI Components (W.I.P)
* Watch source files (ES6, SASS) and build incrementally.
* Source Maps for CSS & JS
* Unit (karma) and e2e (protractor) tests works with your AMD/ES6 code.
* Cross Browser CSS & HTML Injection with BrowserSync [Action Sync, Code Sync]
* Build environment (DEV, TEST, CI, PROD) aware gulp tasks. 
* Incremental builds and auto-testing. [_gulp --env=TEST serve_]
* _Mocked Backend Workflow_ - help with mocking your backend and backend-less development.
* Produce optimized, production ready bundles for deployment. Can produce multiple bundles for lazy loading modules on demand.    
* Your choice of Reusable Components - Angular Directives, Native Web Components, ReactJS all in ES6.  
* Achieve some of the Angular 2.0 goals while still running on Angular 1.3.x
* TypeScript style assertions are enabled in development env for run-time type checking. 
* Animations for rich user experience. 

### Design Patterns 
* Authentication and Fine-grained Authorization - OAuth, [JSON Web Tokens](http://jwt.io/) 
* App-Wide Notifications: ability for any components consistently display error, warn, info messages to the user.
* App-wide Translations and Localization.
* _Functional Reactive Programming_: EventBus, EventStream and RxHTTP facades for Streaming REST API.
* 3-way data binding with [Differential Synchronization](https://neil.fraser.name/writing/sync/) and [JSON Patch](http://jsonpatch.com/) over STOMP
* Resiliency - Retry, Governor, Fallback, Circuit-breaker(W.I.P)
* Caching as a Cross-Cutting Concern.
* Hierarchical and Faceted Navigation.
* Pagination and composable queries to express data dependencies and avoid over/under fetching data from REST API.
* Use ES6 Proxies and ES6+ annotations for AOP.


### Directory Structure

Since a large AngularJS application has many modules and components it's best to structure it in a directory hierarchy.
 
_Creating high-level divisions by functionality and lower-level divisions by component types._

In this way the directory structure will look like:

```
.
├── app
│   ├── index.html
│   ├── index.js
│   ├── index.scss
│   ├── config.yml
│   ├── common
│   │   ├── controllers
│   │   ├── elements
│   │   ├── filters
│   │   ├── services
│   │   ├── utils
│   │   ├── views
│   │   ├── i18n
│   │   ├── fonts
│   │   ├── images
│   │   ├── styles
│   │   │   ├── components
│   │   │   ├── mixins
│   │   │   ├── _variables.scss
│   │   │   └── _functions.scss
│   │   ├── index.js
│   │   └── routes.js
│   ├── home
│   │   ├── controllers
│   │   │   ├── FirstController.js
│   │   │   └── SecondController.js
│   │   ├── elements
│   │   │   ├── FirstElement.js
│   │   │   └── SecondElement.js
│   │   ├── filters
│   │   │   ├── UniqueFilter.js
│   │   │   └── LimitFilter.js
│   │   ├── models
│   │   │   ├── TodoItem.js
│   │   │   └── TodoList.js
│   │   ├── services
│   │   │   ├── FirstService.js
│   │   │   └── SecondService.js
│   │   ├── views
│   │   │   ├── contacts.html
│   │   │   └── contact.details.html
│   │   ├── index.js
│   │   ├── index.scss
│   │   └── routes.js
│   ├── about
│   │   ├── controllers
│   │   │   └── ThirdController.js
│   │   ├── services
│   │   │   └── ThirdService.js
│   │   ├── i18n
│   │   │   ├── de_DE.json
│   │   │   └── en_EN.json
│   │   ├── views
│   │   │   ├── about.html
│   │   │   └── about.map.html
│   │   ├── index.js
│   │   ├── index.scss
│   │   └── routes.js
├── .tmp
├── dist
├── lib
├── tasks
└── test
```

_When creating directives/CustomElements it may be useful to put all the files associated with the given CustomElement's files (i.e. templates, CSS/SASS files, JavaScript) in a single folder._

```
elements
├── element1
│   ├── element1.tpl.html
│   ├── element1.js
│   └── element1.scss
└── element2
    ├── element2.tpl.html
    ├── element2.js
    └── element2.scss
```

### Getting Started

```bash
# Clone this repo
git clone https://github.com/xmlking/spa-starter-kit

# Install development tools at global location(one-time)
brew install ruby   # only run if it's not already installed. Mac may already have it at `/usr/bin/ruby` 
brew install nvm    # only run if it's not already installed. (For Windows : you can use `nvmw` or `nvm-windows` )
nvm  install iojs   # run `node -v && npm -v` to verify node installation. (For Windows : `nvmw install iojs`)
nvm alias default iojs-v1.X.X # replace X.X with current version # make iojs-v1.X.X as your default node version.  (For Windows : `nvmw use iojs-v1.X.X`)

[sudo] npm install -g bower
[sudo] npm install -g gulpjs/gulp#4.0
[sudo] npm install -g karma-cli

# Install the dev dependencies for project, such as Karma, Traceur, etc.
npm install   # run  'npm install && npm prune' whenever you upgraded versions in package.json.

# Install runtime dependencies for project with bower.
bower install # run 'bower install && bower prune' whenever you upgraded versions in bower.json.

# Install SASS
[sudo] gem install sass # verify  `sass --version` > 3.4.10

# Start the server and watch for file changes to transpile ES6 files, live reload pages etc. 
gulp serve  # gulp --fatal=off serve # no errors should kill the live server.

# Build project: creates `dist` directory for deployment to Web Servers. 
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
npm update -g           # update all outdated global packages
npm update --save-dev   # update all outdated local packages (run from project directory) 
npm update npm -g       # self npm update
brew update && brew doctor
brew upgrade nvm        # update to latest nvm version
npm shrinkwrap --dev    # if you want to lock down all `package.json` dependency versions 
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

### Mocked Backend Workflow 

####Advantages####
  * Parallel development with backend
  * Frontend can have a hand in defining API
  * Control over responses
  * Minimal impact on code
  * Backend-less development (continue development even when backend not available)
  * Useful for e2e tests
  * Useful for demoing UI work without backend
  
```bash
gulp --env=TEST serve
gulp --env=TEST --optimize=true # Produce optimized build like `--env=PROD` and also include [fixtures](./test/fixtures) like `--env=TEST`
gulp deploy                     # to deploy dist folder to gh-pages
```

***however you can also use this pre-build Grails App [apiApp.war](https://github.com/xmlking/grails-batch-rest/releases) as backend for this SPA App.*** 

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

#### Dev server (BrowserSync) Options
Now you can customize BrowserSync dev server online at  `http://localhost:3001/`

####Setting build environment variable for environment-specific gulp tasks: 
Application is by default set with production environment specific settings which can be overridden 
by adding environment specific angular modules (dev.env.js , test.env.js) to [index.js](./app/scripts/index.js) via Gulp command-line arguments.  
By default `templateCache` is disabled and `SourceMaps`, `type assertions` are enabled.  
```bash
gulp --env=PROD task   # or `NODE_ENV=PROD gulp task` : set `global.optimize = true`. This will disable SourceMaps,type assertions  and enable templateCache    
gulp --env=TEST task   # TEST mode for backend-less testing in CI env. data from [fixtures](./test/fixtures) will be served.
gulp --env=DEV  task   # DEV mode points to local backend URLs.
gulp --env=TEST --optimize=true # Produce optimized build like `--env=PROD` and also include [fixtures](./test/fixtures) like `--env=TEST`
```

###Compatibility
The app was tested on:
 
  * Firefox (>= v36)
  * Chrome (>= v37)
  
  * iojs (>= v1.2.0)
  
### Tips
If you are behind firewall and want to force **Bower** to get files from `https://` instead of `git://`
```bash
git config --global url."https://".insteadOf git://
```
In case you want to revert that global configuration change
```bash
git config --global --unset url."https://".insteadOf
```
 
#### For Windows Users
>Install [git](http://git-scm.com/downloads) client if needed.
Install iojs/node and above mentioned global node modules, them  
Make sure system path has nvmw and node binaries i.e., `C:\<nvmw root>\nvmw\ and C:\<nvmw root>\nvmw\iojs\latest`. 
Install [Ruby](http://rubyinstaller.org/downloads/) and make sure system path has it. 
if you get SSL error while installing __gem__ modules [check here](http://stackoverflow.com/questions/19150017/ssl-error-when-installing-rubygems-unable-to-pull-data-from-https-rubygems-o/27298259#27298259)


How to delete the `node_modules` folder when Windows complains that file or path names are too long?
```bash
mkdir junk
robocopy junk node_modules /MIR
```
>The (empty) ‘junk’ folder can then be deleted in the normal way

#### For WebStrom/IntelliJ Users
Goto: Files > Languages & Frameworks > JavaScript 

  1. JavaScript language version > select AtScript
 
Goto: Files > Project Structure... >  Project Settings > Libraries

  1. mark `bower_components`, `node_modules` directories as `library`
  
Goto: Files > Project Structure... >  Project Settings > Modules 

  1. mark `.idea`, `.sass-cache`, `.tmp`, `dist`, `bower_components`, `node_modules` directories as `Excluded`.
  2. mark `test` directory as `Test Resources Root`
  3. mark `app` directory as `Sources Root`

### TODO
- [ ] Lazy Load Modules 
[Pending Proposal](https://groups.google.com/forum/#!topic/angular/w0ZEBz02l8s)
[ocLazyLoad](http://blog.getelementsbyidea.com/load-a-module-on-demand-with-angularjs/)
- [ ] offline-first pattern with Service Worker
