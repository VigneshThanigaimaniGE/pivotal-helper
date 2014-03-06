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
						$boardView = $(element).find('.board-view');
						$deskView =$(element).find('.desk-view');
						$secondDivider = $(element).find('.invisible-divider');
						//check if the cumulative height of board and desk view is greater than 800px
						//assuming that 800px is threshold value for a page.
						if($boardView.height() + $deskView.height() >= 800){
							//increase the divider height in such a way that the boardview consumes the whole page
							$(element).find(".divider").height(950 - $boardView.height());
							//increase the deskview height in such a way, that it consumes the whole page. 
							adjustSecondCardOnScreen($deskView);
							adjustSecondCardOnScreen($deskView);
							adjustSecondCardOnScreen($deskView);
							// if($deskView.height()<=600) 
							// 	$secondDivider.height(700 - $deskView.height());
							// else if($deskView.height() >=610){
								
							// 	$deskView.find('.task').css("font-size","12px")
							// }
						}
					});
				});
				
			});
		}
	}
}]);
var adjustSecondCardOnScreen=function(element){
	$elem = $(element);
	$secondDivider = $elem.parent().find('.invisible-divider');
	//increase the deskview height in such a way, that it consumes the whole page. 
	if($elem.height() <= 600){ //the second view is less than a page... make the rest of the page empty.
		$secondDivider.height(625 - $elem.height());
	} 
	else if($elem.height() >=610){
		//make the fonts of tasks slightly lesser
		var currFontSize = parseInt($elem.find('.tasks').css('font-size'));
		$elem.find('.tasks').css("font-size",(currFontSize-2)+"px");
	}
}
app.directive('emitevent', [function(){
	return function(scope, element, attrs){
		if (scope.$last) {
			scope.$emit("onrepeatend")
		};
	}

}]);