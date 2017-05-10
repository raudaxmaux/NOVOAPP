(function() {
'use_strict';

angular.module('APPlanner').controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $rootScope, $location, $stateParams, $timeout, $firebaseObject, FireAuth, Utils, $localStorage){
    // Form data for the login modal
    $scope.user = {
      email: '',
      password: ''
    };

    $rootScope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
         console.log("LogCtrl começa");
        //$scope.$parent.hideHeader();
		  });
    $scope.comparate = function(){
      if($localStorage.usuario){
        if($localStorage.usuario.fbSign){
          console.log("não segue");
          $localStorage.$reset();
        }else{
          console.log("segue");
          $location.path("app/calendario");
        }
      }
    }

    $scope.registro_simples = function(usuario){
      console.log(usuario)
      $scope.user.email = usuario.email;
      $scope.user.password = usuario.password;

      FireAuth.register($scope.user);
    }


    $scope.login_simples = function(usuario){
      $scope.user.email = usuario.email;
      $scope.password = usuario.password;

      FireAuth.login(usuario);
    }  


    $scope.faceLogin = function(){
      console.log("faceLogin")
      FireAuth.signFB();
    }



       $scope.directUser = function(){
        $location.path("app/calendario");
       };

  $scope.comparate();

}; // fim da função
})(); // fim do documento