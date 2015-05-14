// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
    });
})

.controller('homeController', function($ionicPlatform, $scope, $timeout) {

    $ionicPlatform.ready(function() {
        $scope.inside = false;
        estimote.beacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons.
            function(result) {
                console.log('*** Beacons ranged ***');
                $timeout(function(){
                    $scope.estimotes = result.beacons;
                });

                if (!$scope.inside && result.region.uuid == "b9407f30-f5f8-466e-aff9-25556b57fe6d") {
                    cordova.plugins.notification.local.schedule({
                        text: 'Welcome to BAM!',
                        id: 1
                    });
                    $scope.inside = true;
                } else if ($scope.inside && !result.beacons.length) {
                    $scope.inside = false
                    cordova.plugins.notification.local.schedule({
                        text: 'BAM! See you soon!',
                        id: 1
                    });
                }
            },
            function(errorMessage) {
              console.log('Ranging error: ' + errorMessage);
            }
        );
    });
});
