(function() {
'use_strict';

angular.module('APPlanner').controller('ToDoListCtrl', ToDoListCtrl);

function ToDoListCtrl($scope, $rootScope, ionicToast, $ionicModal, $localStorage, $cordovaNetwork, planFactory){
   $scope.$parent.showHeader();

    console.log($rootScope.eventoDaVez);
    $scope.nome = $rootScope.eventoDaVez.name;
    $scope.theEvent = $rootScope.eventoDaVez.calId;

    $scope.listCheck = [];

    if($localStorage.eventos[$scope.theEvent].todo){
        var bjec = {};
        bjec = $localStorage.eventos[$scope.theEvent].todo;
        angular.forEach(bjec, function(tods, key){

            $scope.listCheck[key] = angular.copy(tods);
            //console.log(bjec)
        });
        console.log("vai")
        console.log(bjec)

    }else{
        console.log("segue vazio")
    }

        document.addEventListener("deviceready", function () {
         $scope.connec = $cordovaNetwork.isOnline()
         console.log($scope.connec)
        }); 

        $scope.showTaskPrompt = function() {
            var newTask = {
                item: '',
                done: false
            };  

            $scope.newTask = newTask;
            $scope.modal.show();
        };

        $scope.saveTask = function() {
            console.log("gravou")
            $scope.listCheck.push($scope.newTask);
            $scope.modal.hide();
            $scope.insertIntoObj();
            };

        $scope.cancelTask = function() {
            $scope.modal.hide();
        };

///////////////////////////////////////////////////////////////////////////////////

    $scope.explainMe = function(state){
    	state.done = true;
        $localStorage.eventos[$scope.theEvent].todo = $scope.listCheck;
        $scope.insertIntoObj();
    }

    $scope.removeMe = function(itim){
    	console.log(itim.item)
    	//$scope.listCheck.splice(indi, 1)
    	var aquele = $scope.listCheck.indexOf(itim)
    	console.log(aquele)
    	$scope.listCheck.splice(aquele, 1)
        $scope.insertIntoObj();
    }




    $scope.grave_me = function(objeto) {
        // body...
        if($scope.connec){
            console.log("vou gravar na internet")
            console.log($localStorage.eventos)
            planFactory.insertTodo($localStorage.usuario.uid, $scope.theEvent, objeto)
        }else{
            console.log("não vou gravar na internet")
            ionicToast.show('Não há conexão com a internet. Os dados serão estocados somente no aparelho até o próximo salvamento', 'middle', false, 3000);
        }

    }   


    $scope.insertIntoObj = function(){
        // insere o array dentro de um Objeto
        var bje = {}
        angular.forEach($scope.listCheck, function(todes, keyo){
            bje[keyo] = $scope.listCheck[keyo];
            bje = angular.copy(bje);
            console.log(bje)
        });
        $localStorage.eventos[$scope.theEvent].todo = bje;
        ionicToast.show('Tarefa adicionada com sucesso', 'middle', false, 3000);
        $scope.grave_me(bje);        
    };

     $ionicModal.fromTemplateUrl('templates/auxiliar/inseretodo.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });
    
   $scope.openModal = function() {
      $scope.modal.show();
   };
    
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
    
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
    
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
    
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });     

}; // fim da função
})(); // fim do documento