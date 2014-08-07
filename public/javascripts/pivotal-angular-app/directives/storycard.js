app.directive('storycard',['$timeout',function($timeout){
	return {
		priority:10000,
		restrict: 'E',
		templateUrl: '/javascripts/pivotal-angular-app/components/storyboardcard.html',
		replace:true,
		controller:function($scope){

		}
	}
}]);

var adjustCardSize = function() {

}
app.directive('emitevent', [function(){
	return function(scope, element, attrs){
		if (scope.$last) {
			scope.$emit("onrepeatend")
		};
	}

}]);