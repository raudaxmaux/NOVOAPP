angular.module('APPlanner').factory('Utils', Utils)

	function Utils($ionicLoading,$ionicPopup) {

	var Utils = {
		show: show,
		hide: hide,
		alertshow: alertshow,
		errMessage: errMessage
	  };

	return Utils;

    function show() {
      $ionicLoading.show({
  	    animation: 'none',
  	    showBackdrop: true,
  	    maxWidth: 200,
  	    showDelay: 100,
        template: '<ion-spinner icon="lines"/>'
      });
    };

    function hide(){
      $ionicLoading.hide();
    };

	function alertshow(tit,msg){
		var alertPopup = $ionicPopup.alert({
			title: tit,
 //     cssClass: 'popme',     
			template: msg
		});
	};

	function errMessage(err) {

    var msg = "Unknown Error...";

    if(err && err.code) {
      switch (err.code) {
        case "EMAIL_TAKEN":
           msg = "This Email has been taken."; break;
        case "INVALID_EMAIL":
          msg = "Invalid Email."; break;
         case "NETWORK_ERROR":
          msg = "Network Error."; break;
        case "INVALID_PASSWORD":
          msg = "Invalid Password."; break;
          msg = "Invalid User."; break;
      }
    }
		Utils.alertshow("Error",msg);
	};

};
