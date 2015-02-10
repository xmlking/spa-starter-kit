import styles   from './styles';
import fonts    from './fonts';
import images   from './images';
import partials from './partials';
import wiredep  from './wiredep';
import scripts  from './scripts';
import watch    from './watch';
import build    from './build';
import server   from './server';
import unitTests from './unit';
import e2eTests from './e2e';
import deploy   from './deploy';

let gulp = require('gulp');
let config = require('js-yaml').safeLoad(require('fs').readFileSync('tasks/config.yml', 'utf8'));
let args = require('yargs').argv;

// Get environment, for environment-specific activities
global.env  = require('yargs').argv.env || process.env.NODE_ENV;
global.optimize = (env === 'PROD' || require('yargs').argv.optimize);
console.log('Using Env:', env);
console.log('Optimized:', optimize);

styles(gulp, config, args);
fonts(gulp, config, args);
images(gulp, config, args);
partials(gulp, config, args);
wiredep(gulp, config, args);
scripts(gulp, config, args);
watch(gulp, config, args);
build(gulp, config, args);
server(gulp, config, args);
unitTests(gulp, config, args);
e2eTests(gulp, config, args);
deploy(gulp, config, args);
