/**
 * Stubbing of HTTP requests for backend-less frontend testing
 * TODO https://github.com/gah-boh/angular-mock-back/blob/b4a9b161a00729f1af15f81b3b49191f22e1423d/angular-mock-back.js
 */
import 'angular-mocks';

import 'text!../test/fixtures/user/sumo_profile.json';
import 'text!../test/fixtures/user/businessadmin_profile.json';
import 'text!../test/fixtures/user/itadmin_profile.json';
import 'text!../test/fixtures/user/dataadmin_profile.json';

import 'text!../test/fixtures/drug/drugs_0.json';
import 'text!../test/fixtures/drug/drugs_100.json';
import 'text!../test/fixtures/drug/drug_1.json';
import 'text!../test/fixtures/drug/drug_2.json';
import 'text!../test/fixtures/drug/drug_3.json';

import 'text!../test/fixtures/provider/providers_0.json';
import 'text!../test/fixtures/provider/providers_100.json';
import 'text!../test/fixtures/provider/provider_2652254.json';
import 'text!../test/fixtures/provider/provider_2131213.json';
import 'text!../test/fixtures/provider/specialties_A.json';
import 'text!../test/fixtures/provider/specialties_B.json';
import 'text!../test/fixtures/provider/specialties_C.json';
import 'text!../test/fixtures/provider/specialties_D.json';
import 'text!../test/fixtures/provider/specialties_E.json';
import 'text!../test/fixtures/provider/specialties_F.json';
import 'text!../test/fixtures/provider/specialties_S.json';


import {EBUS_CONFIG} from './reactive/EventBus';

let moduleName = 'spaApp.test.env';
let testEnvModule = angular.module(moduleName, ['ngMockE2E']);

testEnvModule.config( () => {
  'use strict';
  console.log('in testEnvModule... ');
  EBUS_CONFIG.BASE_URL = 'http://localhost:8080/apiApp/stomp';
});

function parseURL(url) {
  let parser = document.createElement('a'),
    params = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for( i = 0; i < queries.length; i++ ) {
    split = queries[i].split('=');
    params[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    params: params,
    hash: parser.hash
  };
}

function parseParamFromURL(url) {
  return url.split('/').pop();
}

testEnvModule.run( ($httpBackend) => {
  'use strict';
  console.log('in testEnvModule... ');
  // Do your mock here
  $httpBackend.whenPOST(/\http:\/\/apsrd3850:8080\/apiApp\/j_spring_security_check/)
    .respond( (method, url, data, headers) => {
      console.log('Received data',method, url, data, headers);
      if(data.contains('j_username=sumo&j_password=demo')) {
        window.username = 'sumo'; // use ngCookies and   $cookies.sessionId = "1234567";?
        return [200, {success: true, username: 'sumo'}];
      } else if(data.contains('j_username=businessadmin&j_password=businessadmin')) {
        window.username = 'businessadmin';
        return [200, {success: true, username: 'businessadmin'}];
      } else if(data.contains('j_username=itadmin&j_password=itadmin')) {
        window.username = 'itadmin';
        return [200, {success: true, username: 'itadmin'}];
      } else if(data.contains('j_username=dataadmin&j_password=dataadmin')) {
        window.username = 'dataadmin';
        return [200, {success: true, username: 'dataadmin'}];
      } else {
        return [200, {error: 'Sorry, we were not able to find a user with that username and password.'}];
      }
    });

  $httpBackend.whenGET(/\http:\/\/apsrd3850:8080\/apiApp\/login\/currentUser/)
    .respond( (method, url) => {
      console.log('Received URL',url);
      console.log('window.username',window.username);

      if(window.username === 'sumo') {
        return [200, require('text!../test/fixtures/user/sumo_profile.json')];
      } else if(window.username === 'businessadmin') {
        return [200, require('text!../test/fixtures/user/businessadmin_profile.json')];
      } else if(window.username === 'itadmin') {
        return [200, require('text!../test/fixtures/user/itadmin_profile.json')];
      } else if(window.username === 'dataadmin') {
        return [200, require('text!../test/fixtures/user/dataadmin_profile.json')];
      } else {
        return [200, {error: 'Sorry, we were not able to find a user with that username and password.'}];
      }
    });

  $httpBackend.whenPOST(/\http:\/\/apsrd3850:8080\/apiApp\/logout/)
    .respond( () => {
      window.username = undefined;
      return [200, {}];
    });

  $httpBackend.when('GET', /\http:\/\/apsrd3850:8080\/apiApp\/drugs\?fields*/)
    .respond( (method, url) => {
      console.log('url',url);
      if(!window.username) {
        return [401, {message: 'authentication required'}];
      }
      if(url.contains('offset=0')) {
        return [200, require('text!../test/fixtures/drug/drugs_0.json')];
      } else if(url.contains('offset=100')) {
        return [200, require('text!../test/fixtures/drug/drugs_100.json')];
      } else {
        return [200, require('text!../test/fixtures/drug/drugs_0.json')];
      }
    });

  $httpBackend.whenGET(/\http:\/\/apsrd3850:8080\/apiApp\/drugs\/[1-9]*/)
    .respond( (method, url) => {
      console.log('url',url);
      let id = parseParamFromURL(url);
      if( ['1','2','3'].indexOf(id) < 0) {
        id = '1';
      }
      return [200, require(`text!../test/fixtures/drug/drug_${id}.json`)];
    });

  $httpBackend.whenGET(/http:\/\/apsed2427:8080\/api\/providers\?facets*/ )
    .respond( (method, url) => {
      console.log('url',url);
      if(url.contains('offset=0')) {
        return [200, require('text!../test/fixtures/provider/providers_0.json')];
      } else if(url.contains('offset=100')) {
        return [200, require('text!../test/fixtures/provider/providers_100.json')];
      } else {
        return [200, require('text!../test/fixtures/provider/providers_0.json')];
      }
    });

  //$httpBackend.whenGET(/\http:\/\/apsed2427:8080\/api\/providers\/[a-zA-Z0-9_]*/)
  $httpBackend.whenGET(/\http:\/\/apsed2427:8080\/api\/providers\/(\d+)/)
    .respond( (method, url) => {
      console.log('url',url);
      let id = parseParamFromURL(url);
      if( ['2652254','2131213'].indexOf(id) < 0) {
        id = '2652254';
      }
      return [200, require(`text!../test/fixtures/provider/provider_${id}.json`)];
    });

  $httpBackend.whenGET(/http:\/\/apsed2427:8080\/api\/providers\/specialties\?*/)
    .respond( (method, url) => {
      let prefix = parseURL(url).params.prefix.toUpperCase();
      if(prefix.startsWith('A')) {
        return [200, require('text!../test/fixtures/provider/specialties_A.json')];
      } else if(prefix.startsWith('B')) {
        return [200, require('text!../test/fixtures/provider/specialties_B.json')];
      } else if(prefix.startsWith('C')) {
        return [200, require('text!../test/fixtures/provider/specialties_C.json')];
      } else if(prefix.startsWith('D')) {
        return [200, require('text!../test/fixtures/provider/specialties_D.json')];
      } else if(prefix.startsWith('E')) {
        return [200, require('text!../test/fixtures/provider/specialties_E.json')];
      } else if(prefix.startsWith('F')) {
        return [200, require('text!../test/fixtures/provider/specialties_F.json')];
      } else {
        return [200, require('text!../test/fixtures/provider/specialties_S.json')];
      }
    });

  // Don't mock the html views
  $httpBackend.whenGET(/views\/\w+.*/).passThrough();

  // For everything else, don't mock
  $httpBackend.whenJSONP('http://www.telize.com/geoip?callback=JSON_CALLBACK').passThrough();
  $httpBackend.whenGET(/^\w+.*/).passThrough();
  $httpBackend.whenPOST(/^\w+.*/).passThrough();
});

export default moduleName;
