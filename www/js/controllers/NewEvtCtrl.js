(function() {
'use_strict';

angular.module('APPlanner').controller('NewEvtCtrl', NewEvtCtrl);

function NewEvtCtrl($scope, $rootScope, $localStorage, Utils, ionicToast, ionicDatePicker, ionicTimePicker, $location, planFactory, $cordovaNetwork){
   $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

	$scope.$on("$ionicView.enter", function(event, data){
	   $scope.evtPreCad = true;
	   $scope.mySelect = "Clique para escolher";
		$scope.dataDoEvento = "";
		$scope.horaDoEvento = "";
		$scope.otherEvtType = "";
		$scope.evtType = "";
		$scope.newEvt = {};
		$scope.allEvents = {};

		document.addEventListener("deviceready", function () {
		 $scope.connec = $cordovaNetwork.isOnline()
		 console.log($scope.connec)
		});		 


	});

	    $scope.$on("$ionicView.leave", function(event){
		$scope.dataDoEvento = null;
		$scope.horaDoEvento = null;
		$scope.otherEvtType = null;
		$scope.evtType = null;
		$scope.NewEvtCtrl = null;
		$scope.allEvents = null;
        console.log("saí daqui"); 
	    });	

		$scope.newEvt = {};
		$scope.allEvents = {};
		if($localStorage.eventos){
			$scope.allEvents = $localStorage.eventos;
			rewindEvt()
		};	


 $scope.changeEventType = function(sel){
  	console.log(sel);
  		$scope.evtType = sel; 
  	if(sel == "Outro"){
  		$scope.evtPreCad = false;		
  	}
  }

  function rewindEvt(argument) {
  	// body...
 		console.log("aqui está o evento já guardado")
		console.log($scope.allEvents); 	
  }


/////////////////////////////////////////////////////////

       $scope.calendObj = {
       		callback: function(val){
       			console.log (val)
       			$scope.dataDoEvento = val;
       		},
       		setLabel: 'OK',
       		closeLabel: 'Fechar',
       		weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
       		monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
       		templateType: 'popup',
	        modalHeaderColor: 'vermelhao', //Optional
	        modalFooterColor: 'vermelhao', //Optional      		
			dateFormat: 'dd MMMM yyyy',
			closeOnSelect: false       		
       };

       $scope.normDate = function(){
       	 ionicDatePicker.openDatePicker($scope.calendObj);	
       };

//////////////////////////////////////////////////////////

$scope.eventTime = {
	    callback: function (val) {      //Mandatory
			console.log ("este é "+val);
	    	$scope.horaDoEvento = val;
	    	$scope.horaok = true
	    },
	    inputTime: 50400,   //Optional
	    format: 24,         //Optional
	    step: 15,           //Optional
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

//////////////////////////////////////////////////////////

function engMonth(mes){
var abrev = "";
if(mes === 0){
	abrev = "Jan"; 
}else if(mes === 1){
	abrev = "Feb";	
}else if(mes === 2){
	abrev = "Mar";	
}else if(mes === 3){
	abrev = "Apr";	
}else if(mes === 4){
	abrev = "May";	
}else if(mes === 5){
	abrev = "Jun";	
}else if(mes === 6){
	abrev = "Jul";	
}else if(mes === 7){
	abrev = "Aug";	
}else if(mes === 8){
	abrev = "Sep";	
}else if(mes === 9){
	abrev = "Oct";	
}else if(mes === 10){
	abrev = "Nov";	
}else if(mes === 11){
	abrev = "Dec";	
}

return abrev;

}


$scope.vambora = function(){
		$location.path('app/eventos');
}

$scope.marcador = function(marcacao){
	var i=0;
	var marker = marcacao
	var utcMes = new Date($scope.dataDoEvento);
	var diaCal = utcMes.getDate();
	var anoCal = utcMes.getFullYear();
	var mesCal =  utcMes.getMonth();
	var calId = diaCal+"-"+engMonth(mesCal)+"-"+anoCal;

	if($scope.evtType !== "Outro"){
		marker.evtType = $scope.evtType;
	}
	if($scope.evtType == "Outro"){
		marker.evtType = $scope.otherEvtType;
	}
	if($scope.evtType == "Clique para escolher"){
		marker.evtType = "";
	}

	marker.evtHour = $scope.horeador($scope.horaDoEvento);
	marker.evtDay = $scope.dataDoEvento;
	marker.calId = calId;

	if($localStorage.eventos){

		angular.forEach($localStorage.eventos, function(value, key){
			if(key === calId){
				i++
			}
		});

		if(i != 0){
			Utils.alertshow("Aviso", "Já existe um evento marcado para o mesmo dia!");
		}else{
			acabe_de_gravar(marker);
		}		

	}else{
		$localStorage.eventos = {};
		acabe_de_gravar(marker);
	}





	function acabe_de_gravar(petardo) {
		// body...
		$localStorage.eventos[petardo.calId] = petardo;

		if($scope.connec){
			console.log("vou gravar na internet")
			planFactory.insertEvt($localStorage.usuario.uid, $localStorage.eventos)
		}else{
			console.log("não vou gravar na internet")
			ionicToast.show('Não há conexão com a internet. Os dados serão estocados somente no aparelho até o próximo salvamento', 'middle', false, 3000);
		}

		console.log($localStorage.eventos)
		$location.path('app/eventos');
	}	



	//evalEvents();
};

}; // fim da função
})(); // fim do documento