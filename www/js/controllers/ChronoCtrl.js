(function() {
'use_strict';

angular.module('APPlanner').controller('ChronoCtrl', ChronoCtrl);

function ChronoCtrl($scope, $rootScope, ionicToast, $ionicModal, $localStorage, $cordovaNetwork, planFactory, ionicTimePicker){

   $scope.$parent.showHeader();

    console.log($rootScope.eventoDaVez);
    $scope.nome = $rootScope.eventoDaVez.name;
    $scope.theEvent = $rootScope.eventoDaVez.calId;

    $scope.itemTime =  50400;  

    $scope.listCheck = [];

    if($localStorage.eventos[$scope.theEvent].cronograma){
        var bjec = {};
        bjec = $localStorage.eventos[$scope.theEvent].cronograma;
        angular.forEach(bjec, function(shops, key){

            $scope.listCheck[key] = angular.copy(shops);
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
            var newShop = {
                item: '',
                time: '',
                done: false
            };  

            $scope.newShop = newShop;
            $scope.openModal(1);
        };

        $scope.saveTask = function(indice) {
            console.log("gravou")
            $scope.newShop.time = $scope.itemTime;
            $scope.listCheck.push($scope.newShop);
            $scope.closeModal(indice);
            $scope.insertIntoObj();
            };

        $scope.cancelTask = function(indice) {
            $scope.closeModal(indice);
        };

///////////////////////////////////////////////////////////////////////////////////

$scope.eventTime = {
        callback: function (val) {      //Mandatory
            console.log ("este é "+val);
            $scope.itemTime = val;
            $scope.horaok = true
        },
        //inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 5,           //Optional
        setLabel: 'Ok'    //Optional
      };

         $scope.normHour = function(){
         ionicTimePicker.openTimePicker($scope.eventTime);
       };

        $scope.acertaZero = function(minuts){
            if(minuts !== 0){
                return minuts
            }else{
                console.log("ops");
                return "00"
            }
        };   

        $scope.horeador = function(tictac){
            var selectedTime = new Date(tictac * 1000);
            console.log('Selected epoch is : ', tictac, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            var toe = selectedTime.getUTCHours()+":"+$scope.acertaZero(selectedTime.getUTCMinutes());
            if(toe !== '0:00' || $scope.horaok === true){
                return toe;
            }else{
                return "";
            }
        };

///////////////////////////////////////////////////////////////////////////////////

    $scope.explainMe = function(state){
        state.done = true;
        $localStorage.eventos[$scope.theEvent].cronograma = $scope.listCheck;
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

    $scope.removefromUpdate = function(indice){
        //$scope.listCheck.splice(indi, 1)
        $scope.listCheck.splice($scope.indiceMod, 1)
        $scope.closeModal(indice);
        $scope.insertIntoObj();
    }    

    $scope.doneClicked = function(index, item){
        console.log(index);
        console.log(item);
        if($scope.listCheck[index].done === false){
            $scope.listCheck[index].done = true;
        }else{$scope.listCheck[index].done = false}
        $scope.insertIntoObj();
    };

     $scope.updateClicked = function(){
        if($scope.modifItem.done === false){
            $scope.modifItem.done = true;
        }else{$scope.modifItem.done = false}
        //$scope.insertIntoObj();
    };   

    $scope.grave_me = function(objeto) {
        // body...
        if($scope.connec){
            console.log("vou gravar na internet")
            planFactory.insertCrono($localStorage.usuario.uid, $scope.theEvent, objeto)
        }else{
            console.log("não vou gravar na internet")
            ionicToast.show('Não há conexão com a internet. Os dados serão estocados somente no aparelho até o próximo salvamento', 'middle', false, 3000);
        }

    }   


    $scope.insertIntoObj = function(){
        // insere o array dentro de um Objeto
        var bje = {}
        angular.forEach($scope.listCheck, function(shopes, keyo){
            bje[keyo] = $scope.listCheck[keyo];
            bje = angular.copy(bje);
            console.log(bje)
        });
        $localStorage.eventos[$scope.theEvent].cronograma = bje;
        ionicToast.show('Sucesso!', 'middle', false, 3000);
        $scope.grave_me(bje);        
    };


    $scope.editTask = function(index, obito){
        //ionicToast.show('Este botão edita o item de compra', 'middle', false, 3000);
        $scope.indiceMod = index;
        $scope.modifItem = {};
        $scope.modifItem = obito;
        $scope.itemTime = $scope.modifItem.time;
        console.log("entrou")
        console.log($scope.modifItem)        
        $scope.openModal(2)
    };  

    $scope.updateTask = function(indice) {
        console.log("saiu")
        $scope.modifItem.time = $scope.itemTime;
        console.log($scope.modifItem)
        $scope.listCheck[$scope.indiceMod] = $scope.modifItem;
        $scope.closeModal(indice);
        $scope.insertIntoObj();
    };

     $ionicModal.fromTemplateUrl('templates/auxiliar/inserecronograma.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal1 = modal;
   });

    $ionicModal.fromTemplateUrl('templates/auxiliar/modificacronograma.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal2 = modal;
   });

    
   $scope.openModal = function(index) {
      if (index == 1){
       $scope.modal1.show();
      }else{
       $scope.modal2.show();
      }      
   };
    
   $scope.closeModal = function(index) {
      if (index == 1){
       $scope.modal1.hide();
      }else{
       $scope.modal2.hide();
      }
   
   };
    
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal1.remove();
      $scope.modal2.remove();
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