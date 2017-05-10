(function() {
'use_strict';

angular.module('APPlanner').controller('TheEvtCtrl', TheEvtCtrl);

function TheEvtCtrl($scope, $rootScope, ionicMaterialInk){

	console.log($rootScope.eventoDaVez);
	$scope.nome = "";
	$scope.nome = $rootScope.eventoDaVez.name;
    //ionicMaterialInk.displayEffect();	
}; // fim da função
})(); // fim do documento