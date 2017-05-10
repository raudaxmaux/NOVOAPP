(function() {
	'use strict';

angular
	.module('APPlanner')
	.factory('FireAuth', FireAuth);

function FireAuth($rootScope, $firebaseAuth, $firebaseObject, $location, $timeout, accessFactory, Utils, $cordovaFacebook, $http){
	console.log("fire auto")
	var auth = $firebaseAuth();
	var data_de_Adesao = Date.now();
	var FB_data = {};

	var usuario = {
		register: register,
		login: login,
		logout: logout,
		signFB: signFB,
		insertMailPass: insertMailPass,
		isLoggedIn: isLoggedIn,
		updateLogin: updateLogin,
		pegaUser: pegaUser
	}
	return usuario;

	////////////////////////////////////////////////////////


	function register(user) {
			console.log("Registro!!")
			var non_novus = user 
			Utils.show();
	      	auth.$createUserWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
				console.log(firebaseUser);

				var aluno = {
					displayName: user.nome,
					photoURL:'',
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					inscricao: data_de_Adesao,
					fbSign:false,
					fb_UserId: '',
					nivel: 6,
					pagante: false
				}; 
				Utils.hide();
				firebaseUser.updateProfile({
						displayName: user.nome,
  						photoURL: ""					
				})

				insertNewUserFaseUm(aluno);

	      	}).catch(function(error){
	      		//Utils.hide();
	      		console.log("Já existe em Registro");
	      		console.log(error);
	      		if(error.code == "auth/email-already-in-use"){
	      			//Utils.alertshow("Erro", "Já existe um usuário com este email")
					//Utils.hide();
					usuario.login(non_novus);
	      		}      		

	      	});

	    }

	    function login(user) {
	      auth.$signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
	      		if(firebaseUser){
	      		console.log("está logado "+ firebaseUser.uid);
	      		beyondMailPass(firebaseUser.uid);
	      		}
	      }).catch(function(error){
				console.log("Erro em Login");
	      		console.log(error);
	      		// Não existe usuário
	      		if(error.code == "auth/user-not-found"){
	      			Utils.alertshow("Erro", "Não existe usuário cadastrado com esse e-mail")
	      		}
	      		// E-mail mal formatado
	      		if(error.code == "auth/invalid-email"){
	      			Utils.alertshow("Erro", "Verifique se é um e-mail válido")
	      		}	
	      		if(error.code == "auth/wrong-password"){
	      			Utils.alertshow("Erro", "Senha inválida ou o usuário não usa senha")
	      		}        		   		      		
	      })
	    }

	    function logout(){
	    	var saiSucesso = function(){
		      console.log("desconectou") 		
	    	}

	    	var saiFalha = function(){
		      console.log("ainda não desconectou") ;   			    		
	    	}
	    	$cordovaFacebook.logout(saiSucesso, saiFalha);
	    	auth.$signOut();
	    }

	    function isLoggedIn(){
			auth.$onAuthStateChanged(function(user){
				if(user){
					return true;
					console.log("ainda logado")
				}else{
					return false;
					console.log("não logado")
				};
	    	});
		}

	    function signFB(){
	    	console.log("cambio")
			$cordovaFacebook.getLoginStatus().then(function(response){
				if(response.status === "connected"){
					console.log(response)
					console.log("Está conectado, então segue direto para a fase Um");
								
					var semiObj = response;
					fireStuff(semiObj)
				}else{
					console.log("Não está conectado, então conecta-se a partir daqui.");
			    	$cordovaFacebook.login(["public_profile", "email", "user_friends"]).then(function(response) {
					      console.log(response.status + " mais de baixo.");
		 				if(response.status === "connected"){
		 					console.log(response)
							fireStuff(response)	 

		 				}else{
		 						console.log(error.code);
								
		 				}
					    });		      
				}
			});   

			    	

	    };


		function fireStuff(fulano){
					var credential = firebase.auth.FacebookAuthProvider.credential(fulano.authResponse.accessToken);
					
 					firebase.auth().signInWithCredential(credential).then(function(authData){

						var fbaluno = {
							displayName: authData.displayName,
							photoURL: authData.photoURL,
							uid: authData.uid,
							email: authData.email,
							inscricao: data_de_Adesao,
							fbSign:true,
							fb_UserId: authData.providerData[0].uid,		
							nivel: 6,
							pagante: false
						};
						FB_data = fbaluno;

						


						console.log("///////////////////////////");
						console.log(authData.providerData[0].uid);
						console.log("///////////////////////////");

						insertNewUserFaseUm(fbaluno)

 					}).catch(function(error){
 						console.log("Erro em Registro com Facebook");
 						console.log(error.code);
 						if(error.code === "auth/account-exists-with-different-credential"){
 							Utils.alertshow("Usuário já existente", "Você já se cadastrou com email/senha");
 						}else{
							Utils.alertshow("Falha no cadastro", "Ocorreu um erro. Tente Novamente.");
 						};
 					});
		};	    

		function insertNewUserFaseUm(obj){
			var objeto = obj;
				console.log("fase Um.");
				/// fazer o update do usuário aqui.	
				///
			  	var usersRef = accessFactory.pegaUsuario(objeto.uid);
			  	usersRef.once('value').then(function(snapshot) {
		    	var exists = (snapshot.val() !== null);
		    	if(exists){
		    		var fb_track = snapshot.val();
		    		console.log("ups " + fb_track)
		    	}else{
		    		console.log("não tem usuário");
		    	}
		    	$timeout(function() {
		   		insertNewUserFaseDois(objeto, fb_track, exists);
		   		}, 300);
		  		});			
		};

		function insertNewUserFaseDois(bje, fb_track, exists){
			console.log("fase Dois")
			
			 if (exists) {
			 	console.log("existe");

		    	$timeout(function() {
				 	if(bje.fbSign !== false)
				 	{
				 		//if(fb_track.photoURL !== bje.photoURL){
				 			//console.log("a imagem não é igual")
				 			//changePhotoURL(bje.photoURL);
				 			//console.log("troca a imagem")

				 		//else{
					 		//console.log("a imagem é igual")				 			
				 			segue_o_seco();
				 		//};
				 	//}else{
				 	//	console.log("nenhuma imagem");
				 	//	segue_o_seco();
				 	};				
				}, 300);
	
			  } else {
			    console.log("ainda não está registrado no Firebase");			  	
			    insertMailPass(bje);
			  }			
		};

	    function beyondMailPass(uid){
			segue_o_seco();
		}

	    function insertMailPass(obj){
			console.log(obj.uid)
			var dataRef = accessFactory.pegaUsuario(obj.uid);
			dataRef.set(obj);
			segue_o_seco();
		}

	    function changePhotoURL(img){
			console.log("Chegou aqui")
			var dataRef = accessFactory.pegaUsuario(obj.uid);
			dataRef.set({photoURL: img});
			segue_o_seco()
		}		

		function segue_o_seco(){
      		$timeout(function() {
      			Utils.hide();
      			console.log("Vai daqui")
      			$location.path("app/calendario");
      		}, 300);				
		};

    	function pegaUser(uid, scope){
      	console.log(uid + " é o que há!")
        var theUser = accessFactory.pegaUsuario(uid);  
        var objU = $firebaseObject(theUser);
        objU.$bindTo(scope, "usuarioAtivo");
      
        objU.$loaded().then(function(){
            console.log("consegui")
            $rootScope.usuarioAtivo = scope.usuarioAtivo;
			//console.log($rootScope.usuarioAtivo);        
            $rootScope.$broadcast("getUserInfo");
        })


    };

//////////////////////////////  A partir daqui somente update do cliente


    function updateLogin(dados){
    	var entrada = dados.uid;
    	var data = dados;
    	delete data.$id;
    	delete data.$priority;
    	console.log(data);
		console.log(entrada)
		var dataRef = accessFactory.pegaUsuario(entrada);
		dataRef.update(data).then(function(success){
			var placeToPoint = data.endereco +" "+ data.numero +" "+ data.bairro +" "+ data.cidade;
			console.log(placeToPoint);		
			//usuario.geoCatcher(placeToPoint, entrada)
		}, function(error){
			console.log("não deu")
			console.log(error);
		})
    };

	
	};// fim service_Auth - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!