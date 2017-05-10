(function() {
'use strict';

angular.module('APPlanner').controller('LogOutCtrl', LogOutCtrl)

function LogOutCtrl($scope, $rootScope, $location, $stateParams, $timeout, $firebaseObject, FireAuth){

    $scope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
        $scope.$parent.hideHeader();      
        firebase.auth().onAuthStateChanged(function(user){
                 console.log('onAuthStateChanged');                
        });
          console.log("fechou")
          FireAuth.logout();
          $scope.$parent.hereGoes = false;
          $location.path("login");
          delete $rootScope.usuarioAtivo;
          ionic.Platform.exitApp();
		  });


$scope.logout = function(){
      console.log("fechou")
      FireAuth.logout();
      $scope.$parent.hereGoes = false;
      //$location.path("app/login");
      delete $rootScope.usuarioAtivo;
      ionic.Platform.exitApp();
    }


};// fim service_Auth - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!