(function() {
'use_strict';

angular.module('APPlanner').controller('PerfilCtrl', PerfilCtrl);

function PerfilCtrl($scope, $rootScope, $ionicPlatform, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, Utils, FireAuth, $cordovaImagePicker, $cordovaFile, $localStorage){

   $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
       $scope.changedPhoto = false;
       $scope.saved = false;
      
    });

    $scope.$on('$ionicView.leave', function(){
        //Utils.alertshow('Saindo', 'Deixando o prédio!.');
        console.log('Deixando o prédio!.')
        console.log($scope.nameURL)
        if($scope.saved === false && $scope.changedPhoto === true){
            console.log("tem de apagar a foto");
            var deleteRef = firebase.storage().ref();

            var goneAway = deleteRef.child($scope.nameURL);
            // Delete the file
            goneAway.delete().then(function() {
              console.log("// File deleted successfully");
            }).catch(function(error) {
              console.log(error);
              console.log("// Uh-oh, an error occurred!");
            });
        }
        delete $scope.usuarioMod;

    });


      // Set Motion
    $scope.autoFunk = $rootScope.$on("getUserInfo", function(ev){
      $scope.usuarioMod = $rootScope.usuarioAtivo;
      if ($scope.usuarioMod.photoURL){
        console.log("sim, temos fotos")
        $scope.theFoto = $scope.usuarioMod.photoURL;
      } else {
        $scope.theFoto = "img/photoless.jpg"
      }
      //console.log($scope.usuarioAtivo);
      $scope.cabouse()
    });

    $scope.cabouse = function(){
      $scope.autoFunk = null;
    }


    $scope.swapAvatar = function(){
        console.log("trocando avatar")
        var fileName, path;

        var options = {
              maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
              height: 800,
              quality: 80            // Higher is better
        };
        
        $cordovaImagePicker.getPictures(options).then(function(results){
              console.log('Image URI: ' + results[0]);   // Print image URI
              fileName = results[0].replace(/^.*[\\\/]/, '');

              if ($ionicPlatform.is("android")) {
                path = cordova.file.cacheDirectory;
              } else {
                path = cordova.file.tempDirectory;
              }

              return $cordovaFile.readAsArrayBuffer(path, fileName);
          }).then(function(success){
              var imageBlob = new Blob([success], { type: "image/jpeg" });
              console.log(imageBlob);
              $scope.saveAvatar(imageBlob, fileName);
          });       
        };

        $scope.saveAvatar = function(blober, filer){
        
        var storageRef = firebase.storage().ref();

        // pass in the _filename, and save the _imageBlob
        var uploadTask = storageRef.child(filer).put(blober);

        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function (error) {
          // Handle unsuccessful uploads, alert with error message
          alert(error.message)
        }, function () {
          // Handle successful uploads on complete
          var downloadURL = uploadTask.snapshot.downloadURL;
          $scope.nameURL = uploadTask.snapshot.a.fullPath;
          $scope.theFoto = downloadURL;
          $scope.$apply();
          console.log("//////////////////////")
          console.log($scope.nameURL)
          $scope.changedPhoto = true;
        });        

        };


    $scope.modificar = function(){
        Utils.show();
        console.log("salvando");
        $scope.saved = true;
        if($scope.changedPhoto){
          $scope.usuarioMod.photoURL = $scope.theFoto;
          FireAuth.updateLogin($scope.usuarioMod);
        }else{
        //console.log($scope.usuarioMod);
          FireAuth.updateLogin($scope.usuarioMod);
      }
    };

      $rootScope.$on('updateDone', function (event) {
          Utils.hide();
          Utils.alertshow('Sucesso', 'Dados gravados com sucesso.');
      });

  $timeout(function() {
      ionicMaterialMotion.blinds({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();


  $scope.ajuda = function(mensagem){
    $scope.$parent.toastMess(mensagem);
  };

}; // fim da função
})(); // fim do documento
