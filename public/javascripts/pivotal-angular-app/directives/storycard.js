app.directive('storycard',[function(){
	return {
		priority:10000,
		restrict: 'E',
		templateUrl: '/javascripts/pivotal-angular-app/components/storyboardcard.html',
		replace:true
	}
}]);