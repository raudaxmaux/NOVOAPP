    $scope.$parent.showHeader();

   $scope.$parent.showHeader();

    console.log($rootScope.eventoDaVez);
    $scope.nome = $rootScope.eventoDaVez.name;
    $scope.theEvent = $rootScope.eventoDaVez.calId;   

    $scope.listCheck = [];

    if($localStorage.eventos[$scope.theEvent].checklists){
        var bjec = {};
        bjec = $localStorage.eventos[$scope.theEvent].checklists;
        angular.forEach(bjec, function(shops, key){
            $scope.listCheck[key] = angular.copy(shops);
        });
        console.log("vai")
        console.log(bjec)
    }else{
        console.log("segue vazio")
    }

        document.addEventListener("deviceready", function () {
             $scope.connec = $cordovaNetwork.isOnline();
             console.log($scope.connec);
        }); 

        $scope.showTaskPrompt = function() {
            var newShop = {
                item: '',
                done: false
            };  

            $scope.newShop = newShop;
            $scope.openModal(1);
        };

        $scope.saveTask = function(indice) {
            console.log("gravou")
            $scope.listCheck.push($scope.newShop);
            $scope.closeModal(indice);
            $scope.insertIntoObj();
        };

        $scope.cancelTask = function(indice){
            $scope.closeModal(indice);
        };

///////////////////////////////////////////////////////////////////////////////////

    $scope.explainMe = function(state){
        state.done = true;
        $localStorage.eventos[$scope.theEvent].checklists = $scope.listCheck;
        $scope.insertIntoObj();
    };

    $scope.removeMe = function(itim){
        console.log(itim.item);
        var aquele = $scope.listCheck.indexOf(itim);
        console.log(aquele)
        $scope.listCheck.splice(aquele, 1);
        $scope.insertIntoObj();
    };

    $scope.removefromUpdate = function(indice){
        $scope.listCheck.splice($scope.indiceMod, 1);
        $scope.closeModal(indice);
        $scope.insertIntoObj();
    };

    $scope.doneClicked = function(index, item){
        console.log(index);
        console.log(item);
        if($scope.listCheck[index].done === false){
            $scope.listCheck[index].done = true;
        }else{
            $scope.listCheck[index].done = false
        };
        $scope.insertIntoObj();
    };

     $scope.updateClicked = function(){
        if($scope.modifItem.done === false){
            $scope.modifItem.done = true;
        }else{
            $scope.modifItem.done = false;
        };
    };   

    $scope.grave_me = function(objeto){;
        // body...
        if($scope.connec){
            console.log("vou gravar na internet")
            planFactory.insertChecklist($localStorage.usuario.uid, $scope.theEvent, objeto);
        }else{
            console.log("não vou gravar na internet")
            ionicToast.show('Não há conexão com a internet. Os dados serão estocados somente no aparelho até o próximo salvamento', 'middle', false, 3000);
        };

    }   


    $scope.insertIntoObj = function(){
        // insere o array dentro de um Objeto
        var bje = {}
        angular.forEach($scope.listCheck, function(shopes, keyo){
            bje[keyo] = $scope.listCheck[keyo];
            bje = angular.copy(bje);
            console.log(bje)
        });
        $localStorage.eventos[$scope.theEvent].checklists = bje;
        ionicToast.show('Sucesso!', 'middle', false, 3000);
        $scope.grave_me(bje);        
    };


    $scope.editTask = function(index, obito){
        //ionicToast.show('Este botão edita o item de compra', 'middle', false, 3000);
        $scope.indiceMod = index;
        $scope.modifItem = {};
        $scope.modifItem = obito;
        console.log("entrou")
        console.log($scope.modifItem)        
        $scope.openModal(2);
    };  

    $scope.updateTask = function(indice) {
        console.log("saiu")
        console.log($scope.modifItem)
        $scope.listCheck[$scope.indiceMod] = $scope.modifItem;
        $scope.closeModal(indice);
        $scope.insertIntoObj();
    };

     $ionicModal.fromTemplateUrl('templates/auxiliar/inserechecklist.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal1 = modal;
   });

    $ionicModal.fromTemplateUrl('templates/auxiliar/modificachecklist.html', {
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
      };
   };
    
   $scope.closeModal = function(index) {
      if (index == 1){
       $scope.modal1.hide();
      }else{
       $scope.modal2.hide();
      };
   
   };



