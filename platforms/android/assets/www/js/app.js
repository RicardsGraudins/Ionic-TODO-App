angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //Abstract state for tabs
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'tabCtrl'
  })

  //Home tab
  .state('tab.home', {
    url: "/home",
    views: {
      'tab-home': {
        templateUrl: "templates/home.html"
      }
    }
  })

  //Options tab
  .state('tab.options', {
    url: "/options",
    views: {
      'tab-options': {
        templateUrl: "templates/options.html",
        controller: 'tabCtrl'
      }
    }
  });
    
  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
});
