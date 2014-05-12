app.directive('storycard',['$timeout',function($timeout){
	return {
		priority:10000,
		restrict: 'E',
		templateUrl: '/javascripts/pivotal-angular-app/components/storyboardcard.html',
		replace:true,
		controller:function($scope){
			$scope.$on("onrepeatend",function(){
				$timeout(function(){
					$storiesDom = $('.printMe');
					$storiesDom.each(function(index,element){
						adjustCardSize();
					});
				});

			});
		}
	}
}]);

var adjustCardSize = function() {
	var elements = $('.printMe'), divHeight=0, prevDiv, prevDivHeight, tempDiv;
	for (var i = 0; i < elements.length; i++) {
		$(elements[i]).attr('id', (i+1));
	}
	elements.each(function() {
		divHeight += $(this).height() + 10;
		if(divHeight > 800) {
			prevDiv = $(this).attr('id') - 1;
			prevDivHeight = divHeight - $(this).height() - 10;
			$('#'+prevDiv).append('<div id="tempDiv'+prevDiv+'">&nbsp;</div>');
			$('#tempDiv'+tempDiv).height(770 - prevDivHeight);
			divHeight = $(this).height();
		}
	});
}
app.directive('emitevent', [function(){
	return function(scope, element, attrs){
		if (scope.$last) {
			scope.$emit("onrepeatend")
		};
	}

}]);