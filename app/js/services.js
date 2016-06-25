'use strict';

/* Services */

var tpsServices = angular.module('tpsServices', ['ngResource']);

tpsServices.factory('ApiRequest', ['$resource',
    function($resource){
        return $resource('', {}, {
            getCurrentMatches: {method:'GET', url: apiUrl + apiKey +'/matches/listplaying', params:{a:'c'}, isArray:true, cache: false},
            getUpcomingMatches: {method:'POST', url: apiUrl + apiKey +'/matches/liststatus', cache: false},
            getLastMatches: {method:'POST', url: apiUrl + apiKey +'/matches/liststatus', cache: false}
        });
    }

]);