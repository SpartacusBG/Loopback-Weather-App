angular
    .module('app')
    .controller('WeatherController', ['$scope', 'WeatherService', '$state',
        function ($scope, weatherService, $state) {
            $scope.searchValue = 'London';
            $scope.weeklyWeather = [];
            $scope.loading = false;
            $scope.city = '';
            $scope.country = '';

            $scope.getCityInformation = getCityInformation;
            $scope.findCurentDay = findCurentDay;
            $scope.trimAfterTheDot = trimAfterTheDot;
            $scope.showError = false;
            $scope.showNoResultsMessage = false;

            var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

            function getCityInformation() {
                $scope.loading = true;
                $scope.showNoResultsMessage = false;
                weatherService.getCityInformation($scope.searchValue).then(function (data) {
                    var response = data.cityInformation;
                    if (!response.length) {
                        $scope.showNoResultsMessage = true;
                        clearCurrentResults();
                        $scope.loading = false;
                        return;
                    }
                    var weid = response[0].woeid;
                    fetchForecast(weid);
                }).catch(error => onError(error))
            }

            function clearCurrentResults() {
                $scope.weeklyWeather = [];
                $scope.city = '';
                $scope.country = '';
            }

            function findCurentDay(date) {
                var dayIndex = new Date(date).getDay();
                return days[dayIndex];
            }

            function trimAfterTheDot(number) {
                return number.toFixed(1);
            }

            function onError(error) {
                $scope.showError = true;
                $scope.loading = false;
                $scope.showNoResultsMessage = false;
                clearCurrentResults();
            }

            function fetchForecast(weid) {
                weatherService.getForecast(weid).then(function (data) {
                    var response = data.weatherInformation;
                    $scope.weeklyWeather = response.consolidated_weather;
                    $scope.city = response.title;
                    $scope.country = response.parent.title;
                    $scope.loading = false;
                    $scope.showError = false;
                }).catch(error => onError(error));
            }
        }]);
