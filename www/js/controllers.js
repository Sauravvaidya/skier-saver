angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $cordovaSms) {

  
  $scope.user = {};

  $scope.sendHelpText = function () {
    var textMessage = "Help Me!!";
    var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without open any other app
            }
    };
    console.log('Trying to send!!');
    console.log($cordovaSms);

    document.addEventListener("deviceready", function () {
    console.log($scope.user.number, textMessage);

    $cordovaSms
      .send($scope.user.number, textMessage, options)
      .then(function() {
        console.log('Succes!!');
        $scope.user.number = '';
      }, function(error) {
        console.log('Error!!');
        
        // An error occurred
      });
    });
  };

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
