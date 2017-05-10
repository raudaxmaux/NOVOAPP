(function(){
	'use strict';
	/**
	* accessFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('APPlanner')
	.factory('accessFactory', accessFactory);


	function accessFactory(){
		var userPath = firebase.database().ref("usuarios");
		var eventPath = firebase.database().ref("eventos");
		var todoPath = firebase.database().ref("to_dos");
		var checkPath = firebase.database().ref("checklists");				
		var shopPath = firebase.database().ref("compras");
		var cronoLists = firebase.database().ref("cronogramas");
		var workLists = firebase.database().ref("fornecedores");
		var moneyPath = firebase.database().ref("orcamento");
		var nakedPath = firebase.database();		
		
		var accessBack = {
			pegaUsuario: pegaUsuario,
			pegaEventList: pegaEventList,			
			pegaTodoList: pegaTodoList,
			pegaChecklist: pegaChecklist,
			pegaShopList: pegaShopList,
			pegaCronogramas: pegaCronogramas,
			pegaFornecedores: pegaFornecedores,
			pegaBalanco: pegaBalanco,		
			pegaTudo: pegaTudo
		};
		return accessBack;

		function pegaUsuario(key){
			return userPath.child(key);
		}

		function pegaEventList(chave){
			return eventPath.child(chave);
		}		

		function pegaTodoList(key){
			return todoPath.child(key);
		}

		function pegaChecklist(key){
			return checkPath.child(key);
		};

		function pegaShopList(key){
			return shopPath.child(key);
		}

		function pegaCronogramas(key){
			return cronoLists.child(key);
		};

		function pegaFornecedores(key) {
			return workLists.child(key);
		}

		function pegaBalanco(key) {
			return moneyPath.child(key);
		}

		function pegaTudo(){
			return nakedPath;
		};		
		
	}; // fim da função principal
})(); // fim do arquivo JS
