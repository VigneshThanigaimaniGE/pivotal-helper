app.controller('stories',function($scope){
	$scope.stories = renderedStories;
	$scope.user = userObj;

	$scope.gravatarUrl="";
	if($scope.user.gravatarEmail)
		$scope.gravatarUrl = "http://gravatar.com/avatar/"+md5($scope.user.gravatarEmail)+"?s=150";
});