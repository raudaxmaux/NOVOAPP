(function(){
	'use strict';
	/**
	* accessFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('APPlanner')
	.factory('eventFactory', eventFactory);


	function eventFactory(){

		console.log('eventFactory');

		var eventos = {
			insertEvt: insertEvt
		};
		return eventos;

		function insertEvt(obj) {
			// body...
			var tento = obj;
			console.log(tento.calId);
			$localStorage.eventos[calId] = tento;
			$rootScope.$broadcast("savedInfo");
		};

	}; // fim da função principal
})(); // fim do arquivo JS		