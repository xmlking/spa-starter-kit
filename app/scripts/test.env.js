/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';

import 'text!../../test/fixtures/drugs_1.json';
import 'text!../../test/fixtures/drugs_2.json';
import 'text!../../test/fixtures/drug_1.json';
import 'text!../../test/fixtures/drug_2.json';
import 'text!../../test/fixtures/drug_3.json';

import 'text!../../test/fixtures/providers_11.json';
import 'text!../../test/fixtures/providers_12.json';
import 'text!../../test/fixtures/providers_2.json';

import 'text!../../test/fixtures/specialties_A.json';
import 'text!../../test/fixtures/specialties_B.json';
import 'text!../../test/fixtures/specialties_C.json';
import 'text!../../test/fixtures/specialties_D.json';
import 'text!../../test/fixtures/specialties_E.json';
import 'text!../../test/fixtures/specialties_F.json';
import 'text!../../test/fixtures/specialties_S.json';

import 'text!../../test/fixtures/sumo_profile.json';
import 'text!../../test/fixtures/businessadmin_profile.json';
import 'text!../../test/fixtures/itadmin_profile.json';
import 'text!../../test/fixtures/dataadmin_profile.json';

let moduleName = 'spaApp.test.env';
let testEnvModule = angular.module(moduleName, ['ngMockE2E']);

testEnvModule.run( ($httpBackend) => {
    'use strict';
    console.log('in testEnvModule... ');
    // Do your mock
    $httpBackend.whenPOST(/\http:\/\/ve7d00000010:8080\/apiApp\/j_spring_security_check/)
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

    $httpBackend.whenGET(/\http:\/\/ve7d00000010:8080\/apiApp\/login\/currentUser/)
        .respond( (method, url) => {
            console.log('Received URL',url);
            console.log('window.username',window.username);

            if(window.username === 'sumo') {
                return [200, require('text!../../test/fixtures/sumo_profile.json')];
            } else if(window.username === 'businessadmin') {
                return [200, require('text!../../test/fixtures/businessadmin_profile.json')];
            } else if(window.username === 'itadmin') {
                return [200, require('text!../../test/fixtures/itadmin_profile.json')];
            } else if(window.username === 'dataadmin') {
                return [200, require('text!../../test/fixtures/dataadmin_profile.json')];
            } else {
                return [200, {error: 'Sorry, we were not able to find a user with that username and password.'}];
            }
        });

    $httpBackend.whenPOST(/\http:\/\/ve7d00000010:8080\/apiApp\/logout/)
        .respond( () => {
            window.username = undefined;
            return [200, {}];
        });

    $httpBackend.whenGET(/\http:\/\/ve7d00000010:8080\/apiApp\/drugs\?fields*/)
        .respond( (method, url) => {
            console.log('url',url);
            if(!window.username) {
                return [401, {message: 'authentication required'}];
            }
            if(url.contains('offset=0')) {
                return [200, require('text!../../test/fixtures/drugs_1.json')];
            } else if(url.contains('offset=100')) {
                return [200, require('text!./test/fixtures/drugs_2.json')];
            } else {
                return [200, require('text!../../test/fixtures/drugs_1.json')];
            }
        });

    $httpBackend.whenGET(/\http:\/\/ve7d00000010:8080\/apiApp\/drugs\/[1-9]*/)
        .respond( (method, url) => {
            console.log('url',url);
            if(url.contains('drugs/1')) {
                return [200, require('text!../../test/fixtures/drug_1.json')];
            } else if(url.contains('drugs/2')) {
                return [200, require('text!../../test/fixtures/drug_2.json')];
            } else if(url.contains('drugs/3')) {
                return [200, require('text!../../test/fixtures/drug_3.json')];
            } else {
                return [200, require('text!../../test/fixtures/drug_1.json')];
            }
        });

    $httpBackend.whenGET(/http:\/\/ve7d00000179:8080\/REST_HBS_Canonical_Resiliency\/service\/providers\?distance*/ )
        .respond( (method, url) => {
            console.log('url',url);
            if(url.contains('offset=0')) {
                return [200, require('text!../../test/fixtures/providers_11.json')];
            } else if(url.contains('offset=100')) {
                return [200, require('text!../../test/fixtures/providers_12.json')];
            } else {
                return [200, require('text!../../test/fixtures/providers_2.json')];
            }
        });

    $httpBackend.whenGET(/http:\/\/ve7d00000179:8080\/REST_HBS_Canonical_Resiliency\/service\/providers\/specialties\?prefix*/ )
        .respond( (method, url) => {
            console.log('url',url);
            if(url.contains('prefix=A')) {
                return [200, require('text!../../test/fixtures/specialties_A.json')];
            } else if(url.contains('prefix=B')) {
                return [200, require('text!../../test/fixtures/specialties_B.json')];
            } else if(url.contains('prefix=C')) {
                return [200, require('text!../../test/fixtures/specialties_C.json')];
            } else if(url.contains('prefix=D')) {
                return [200, require('text!../../test/fixtures/specialties_D.json')];
            } else if(url.contains('prefix=E')) {
                return [200, require('text!../../test/fixtures/specialties_E.json')];
            } else if(url.contains('prefix=F')) {
                return [200, require('text!../../test/fixtures/specialties_F.json')];
            } else {
                return [200, require('text!../../test/fixtures/specialties_S.json')];
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
