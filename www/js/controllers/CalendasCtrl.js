(function() {
'use_strict';

angular.module('APPlanner').controller('CalendasCtrl', CalendasCtrl);

function CalendasCtrl($scope, $rootScope, $localStorage, accessFactory, $firebaseArray){

	if($rootScope.previousState === undefined){
		if($localStorage.eventos){
			console.log("segue");
		}else{
			console.log("precisamos falar sobre isso");
			retrievEvt($localStorage.usuario.uid);
		}
	};

		function retrievEvt(uid){
			console.log(uid);
			var evPath = accessFactory.pegaEventList(uid);
			evPath.once('value').then(function(snapshot){
				console.log(snapshot.val())
				$localStorage.eventos = snapshot.val()
			});
		};


	$scope.dateValue = "";
	

}; // fim da função
})(); // fim do documento