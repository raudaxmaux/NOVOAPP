(function() {
'use_strict';

angular.module('APPlanner').controller('PlannerCtrl', PlannerCtrl);

function PlannerCtrl($scope, $rootScope, $location, $ionicModal, $ionicPopover, $timeout, FireAuth, $localStorage){

    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    //
    ////////////////////////////////////////
$rootScope.previousState;
$rootScope.currentState;
$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
    console.log('Previous state:'+$rootScope.previousState)
    console.log('Current state:'+$rootScope.currentState)
});

 $scope.userUid = '';
  $scope.userData = [];
  $scope.array = [];
  $scope.foto = 'img/photoless.jpg';

    $scope.$on("$ionicView.enter", function(event, data){
        firebase.auth().onAuthStateChanged(function(user){          
            if(user){
                console.log("com user");
                $scope.userUid = user.uid;   
                $scope.hereGoes = true;
 //               FireAuth.pegaUser($scope.userUid, $scope);
                console.log($scope.userUid)
                console.log("tô falando!")
                //$location.path("app/loginfo");                
            }else{
                console.log("Sem user");
                $scope.hereGoes = false;
                $scope.foto = 'img/photoless.jpg';
               // $location.path("app/login_inicial");              
            };
        });

        if($localStorage.usuario){
            $rootScope.usuarioAtivo = $localStorage.usuario;
            console.log("aqui")
            console.log($rootScope.usuarioAtivo);

        $rootScope.unregistered = $rootScope.usuarioAtivo.pagante;
        $scope.themail = $rootScope.usuarioAtivo.email;            
      if($rootScope.usuarioAtivo.photoURL !== ''){
        $scope.foto = $rootScope.usuarioAtivo.photoURL;
        console.log("tem foto")
      }else{
        console.log("não tem foto")
      }
      if(!$rootScope.usuarioAtivo.displayName){
        $scope.nome = "Olá, usuário";
      }else{
          $scope.nome = $rootScope.usuarioAtivo.displayName;
      }
      console.log("Fiquei bem na foto: " + $scope.foto)                        
        }


    });


    
    ////////////////////////////////////////
    // Pega Caras
    ////////////////////////////////////////

    $rootScope.$on("getUserInfo", function(ev){
        console.log("getUserInfo");
        $rootScope.unregistered = $rootScope.usuarioAtivo.pagante;     
      if($rootScope.usuarioAtivo.photoURL !== '' || $rootScope.usuarioAtivo.photoURL !== undefined){
        $scope.foto = $rootScope.usuarioAtivo.photoURL;
        $scope.themail = $rootScope.usuarioAtivo.email;
        console.log("tem foto")
      }else{
        console.log("não tem foto")
      }
      if(!$rootScope.usuarioAtivo.displayName){
        $scope.nome = "Olá, visitante";
      }else{
          $scope.nome = $rootScope.usuarioAtivo.displayName;

      }
      console.log("Fiquei bem na foto: " + $scope.foto)      
    })


    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

}; // fim da função
})(); // fim do documento