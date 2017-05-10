(function() {
	'use strict';
angular.module('APPlanner')
	.factory('eventPlanner', eventPlanner);
	function eventPlanner($firebaseObject, $timeout, $rootScope, $firebaseArray, $location, Utils, $localStorage, accessFactory) {
		// body...
		console.log('eventPlanner');

		var eventeria = {
			insertEvt: insertEvt
		};
		return eventeria;

		function insertEvt(uid, obj) {
			var salvation = accessFactory.pegaEventList();
			var slot = salvation.child(uid);
			slot.set(obj);
		}
/*
		var eventos = {
			insertEvt: insertEvt
		};
		return eventos;

		function insertEvt(obj) {
			// body...
			var tento = obj;
			console.log(tento.calId);
			$localStorage.eventos.[calId] = tento;
			$rootScope.$broadcast("savedInfo");
		};
*/		
	
	};// fim service_Auth - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!	