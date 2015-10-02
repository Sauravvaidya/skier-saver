angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $cordovaSms, $cordovaContacts, $ionicPopup) {

  $scope.user = {};

  document.addEventListener("deviceready", function () {

    $cordovaContacts.find({ multiple: true}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts.filter(function (phoneContact){
        return Array.isArray(phoneContact.phoneNumbers);
      });
    });

    $scope.sendHelpText = function () {
      var textMessage = "Help Me!!";
      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          //intent: 'INTENT'  // send SMS with the native android SMS messaging
          intent: '' // send SMS without open any other app
        }
      };

      $cordovaSms
        .send($scope.user.number, textMessage, options)
        .then(function() {
          $scope.user.number = '';
          showAlert();
        }, function(error) {
          console.log('Error!!');
        }
      );
    };

    $scope.sendOkayText = function() {
      var textMessage = "I am okay :) ";
      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          //intent: 'INTENT'  // send SMS with the native android SMS messaging
          intent: '' // send SMS without open any other app
        }
      };

      $cordovaSms
        .send($scope.user.number, textMessage, options)
        .then(function() {
          $scope.user.number = '';
          showAlert();
        }, function(error) {
          console.log('Error!!');
        }
      );
    }

     var showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Message sent!!'
         //template: 'It might taste good'
       });
     };
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
