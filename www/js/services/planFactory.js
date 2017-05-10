(function(){
	'use strict';
	/**
	* planFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('APPlanner')
	.factory('planFactory', planFactory);

	function planFactory($firebaseObject, $rootScope, $firebaseArray, accessFactory){
	var planGet = {
		getEvts: getEvts,
		insertEvt: insertEvt,
		insertTodo: insertTodo,
		insertShop: insertShop,
		insertChecklist: insertChecklist,
		insertCrono: insertCrono,
		insertSup: insertSup,
		insertBudget: insertBudget,
		retrieveTodo: retrieveTodo
	};
	return planGet;

		function getEvts(uid) {
			// body...
			var reccon = accessFactory.pegaEventList(uid);
			if(reccon){
				return reccon;
			}			
		}


		function insertEvt(uid, obj) {
			console.log("insertEvt")
			var salvation = accessFactory.pegaEventList(uid);
			//var slot = salvation.child(uid);
			salvation.set(obj);
		}		

		function insertTodo(uid, evtId, obj) {
			console.log("insertEvt")
			var salvation = accessFactory.pegaTodoList(uid);
			//var slot = salvation.child(uid);
			salvation.child(evtId).set(obj);
		}

		function insertShop(uid, evtId, obj) {
			console.log("insertShop")
			var compration = accessFactory.pegaShopList(uid);
			compration.child(evtId).set(obj);
		}

		function insertChecklist(uid, evtId, obj) {
			console.log("insertShop")
			var compration = accessFactory.pegaChecklist(uid);
			compration.child(evtId).set(obj);
		}

		function insertCrono(uid, evtId, obj) {
			console.log("insertShop")
			var compration = accessFactory.pegaCronogramas(uid);
			compration.child(evtId).set(obj);
		}	

		function insertSup(uid, evtId, obj) {
			console.log("insertShop")
			var compration = accessFactory.pegaFornecedores(uid);
			compration.child(evtId).set(obj);
		}

		function insertBudget(uid, evtId, obj) {
			console.log("insertShop")
			var doletas = accessFactory.pegaBalanco(uid);
			doletas.child(evtId).set(obj);
		}										

		function retrieveTodo(uid, evtId){
			var trans = accessFactory.pegaTodoList(uid);
			var traste = trans.child(evtId);
			traste.on("value", function(snapshot){
				var editedAcad = snapshot.val();
				return editedAcad;

			});
		}

	}; // fim da função principal
})(); // fim do arquivo JS	