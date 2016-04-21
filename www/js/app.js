// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//reference for local storage http://ionicframework.com/docs/guide/building.html
angular.module('todoHome', ['ionic'])

.factory('Catagories', function() {
  return {
    all: function() {
      var catagoryString = window.localStorage['catagories']; //save in localstorage
        //window.localStorage.clear();  //to clear local storage
      if(catagoryString) {
        return angular.fromJson(catagoryString);
      }
      return [];
    },
    save: function(catagories) {
      window.localStorage['catagories'] = angular.toJson(catagories);
    },
    newCatagory: function(catagoryTitle) {
      // Add a new catagory
      return {
        title: catagoryTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveCatagory']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveCatagory'] = index;
    }
  }
})

.controller('homeCtrl', function($scope, $timeout, $ionicModal, Catagories, $ionicSideMenuDelegate) {

  // A utility function for creating a new catagory
  // with the given catagoryTitle
  var createCatagory = function(catagoryTitle) {
    var newCatagory = Catagories.newCatagory(catagoryTitle);
    $scope.catagories.push(newCatagory);
    Catagories.save($scope.catagories);
    $scope.selectCatagory(newCatagory, $scope.catagories.length-1);
  }


  // Load or initialize catagories
  $scope.catagories = Catagories.all();

  // Grab the last active, or the first catagory
  $scope.activeCatagory = $scope.catagories[Catagories.getLastActiveIndex()];

  // Called to create a new catagory
  $scope.newCatagory = function() {
    var catagoryTitle = prompt('Catagory Name');
    if(catagoryTitle) {
      createCatagory(catagoryTitle);
    }
  };

  // Called to select the given catagory
  $scope.selectCatagory = function(catagory, index) {
    $scope.activeCatagory = catagory;
    Catagories.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create the modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeCatagory || !task) {
      return;
    }
    $scope.activeCatagory.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // saves all the catagories
    Catagories.save($scope.catagories);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleCatagories = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // create the first catagory
  $timeout(function() {
    if($scope.catagories.length == 0) {
      while(true) {
        var catagoryTitle = prompt('Your first catagory title:');
        if(catagoryTitle) {
          createCatagory(catagoryTitle);
          break;
        }
      }
    }
  });

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
