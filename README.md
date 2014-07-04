
SPA Starter Kit
=========

**SPA Starter Kit** is a Single Page Application (SPA) Starter project build with **AngularJS** , **AMD** and **ES6**
Demonstrate AngularJS Design Patterns and Best Practices.   

### Getting Started

```bash
# Clone this repo
git clone https://github.com/xmlking/spa-starter-kit

# Install development tools at global location(one-time) :(assume you already have Node/NPM installed)
npm install -g bower
npm install -g karma-cli
brew install ruby

# Install the dev dependencies for project, such as Karma, Traceur, etc.
npm install   # run  'npm install && npm prune' whenever you upgraded versions in package.json.

# Install runtime dependencies for project with bower.
bower install # run 'bower install && bower prune' whenever you upgraded versions in bower.json.

# Install Sass (assume you already have ruby)
[sudo] gem install sass  

# Transpile 3rd party ES6
gulp transpile-deps # also run when you update bower.json with 3rd party ES6 modules di.js, Diary.js etc.  

# Build project: creates  `dist` directory for deployment to Web Servers. 
NODE_ENV=PROD gulp  # `set NODE_ENV=PROD` and `gulp` for windows
 
# Start the server and watch for file changes to transpile ES6 files, live reload pages etc. 
gulp serve

# Other Gulp Commands
gulp or `gulp build`    # to build an optimized version of your application in /dist
gulp serve              # to launch a browser sync server on your source files
gulp serve:dist         # to launch a server on your optimized application
gulp wiredep            # to fill bower dependencies in your .html file(s)
gulp test               # to launch your unit tests with Karma
gulp protractor         # to launch your e2e tests with Protractor
gulp protractor:dist    # to launch your e2e tests with Protractor on the dist files
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
Uncomment following lines in main module [index.js](./app/scripts/index.js)
```js
import testEnvModule from './test.env';

var test = true;
if ( test ) {
    mainModule.requires.push(testEnvModule);
}
```

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
 
### Credits
@nateabele @sindresorhus @silvenon @vojtajina @digisfera  @jonkemp 

