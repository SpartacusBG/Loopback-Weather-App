angular.module('app')
.factory('WeatherService', ['$http', '$q', function ($http, $q) {
    // var url = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/'; // workaround for CORS of we are not using our backend

    var url = 'api/Weather';

    function getCityInformation(city) {
        var deferred = $q.defer();

        $http.get(url + '/get-city-information/?city=' + city)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (err) {
                console.error('Error retrieving woeid');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getForecast(weid) {
        var deferred = $q.defer();

        $http.get(url + '/get-forecast/?woeid=' + weid)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (err) {
                console.error('Error retrieving forecast');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    return {
        getCityInformation: getCityInformation,
        getForecast: getForecast
    };
}]);