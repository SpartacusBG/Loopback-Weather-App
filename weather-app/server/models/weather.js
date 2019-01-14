'use strict';

module.exports = function(Weather) {

let request = require('request');

let mainUrl = `https://www.metaweather.com/api/location/`;

    Weather.getCityInformation = function (city, callback) {
        const url = mainUrl + 'search/?query=' + city;
        request(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
                callback(error);
            } else {
                console.log('body:', JSON.parse(body));
                callback(null, JSON.parse(body));
            }
        });
    }

    Weather.getForecast = function (woeid, callback) {
        const url = mainUrl + woeid;
        request(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
                callback(error);
            } else {
                console.log('body:', JSON.parse(body));
                callback(null, JSON.parse(body));
            }
        });
    }

    Weather.remoteMethod('getCityInformation', {
        http: {
            verb: 'get',
            path: '/get-city-information'
        },
        accepts: {
            arg: 'city',
            type: 'string',
            http: {
                source: 'query'
            }
        },
        returns: {
            arg: 'cityInformation',
            type: 'array'
        }
    });

    Weather.remoteMethod('getForecast', {
        http: {
            verb: 'get',
            path: '/get-forecast'
        },
        accepts: {
            arg: 'woeid',
            type: 'string',
            http: {
                source: 'query'
            }
        },
        returns: {
            arg: 'weatherInformation',
            type: 'object'
        }
    })

};
