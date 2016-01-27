// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ionic.service.core', 'ionic.service.push'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(['$ionicAppProvider', function ($ionicAppProvider) {
    $ionicAppProvider.identify({
        app_id: '64810037',
        api_key: 'b45f077b3a9f3e0b5dd4f33cf6ad3285a4159c70fecd55b0',
        dev_push: true
    });
}])

.controller('PushCtrl', function ($scope, $rootScope, $ionicUser, $ionicPush) {

    $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
        alert('Success: ' + data.token);
        console.log('Got token: ', data.token, data.platform);
        $scope.token = data.token;
    });

    $scope.identifyUser = function () {
        var user = $ionicUser.get();

        if (!user.user_id) {
            user.user_id = $ionicUser.generateGUID();
        }

        angular.extend(user, {
            name: 'My Name',
            bio: 'I am awesome'
        });

        $ionicUser.identify(user).then(function () {
            $scope.identified = true;
            console.log('name: ' + user.name + "--- Id: " + user.user_id);
        });
    };

    $scope.pushRegister = function () {
        $ionicPush.register({
            canShowAlert: true,
            canSetBadge: true,
            canPlaySound: true,
            canRunActionsOnWake: true,
            onNotification: function (notification) {
                // handle your stuff
                return true;
            }
        });
    };
});
