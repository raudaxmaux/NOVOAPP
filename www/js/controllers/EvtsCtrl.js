(function() {
'use_strict';

angular.module('APPlanner').controller('EvtsCtrl', EvtsCtrl);

function EvtsCtrl($scope, $rootScope, $location, ionicMaterialInk, $localStorage, $ionicModal, Utils, ionicDatePicker, ionicTimePicker){
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

	$scope.$on("$ionicView.enter", function(event, data){	 


		if($localStorage.eventos){	
	  		$rootScope.allEvents = $localStorage.eventos;
	  		$scope.temEventos = true;
//	  		evalEvents();
	  	}else{
	  		$scope.temEventos = false;
	  		console.log("zerado")
	  	}
  	
	});

		$scope.newEvt = {};
		$rootScope.allEvents = {};	



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



function evalEvents() {

    if(Object.keys($rootScope.allEvents).length > 0){
    	$scope.temEventos = true;
    	console.log("habemus eventum")

    }
     if($rootScope.allEvents.length == 0){   
    	$scope.temEventos = false;
    	console.log("non habemus eventum")    	
    }

}


	$scope.clicked = function(eventissimo){
		var daVez = {};
		daVez = eventissimo;
		console.log(daVez);
		$rootScope.eventoDaVez = daVez;
		$location.path('app/eventounico');
	}


    ionicMaterialInk.displayEffect();
}; // fim da função
})(); // fim do documento