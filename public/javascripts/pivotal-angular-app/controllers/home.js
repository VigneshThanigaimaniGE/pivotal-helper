app.controller('home',function($scope){
	$scope.user=userObj;
	$scope.gravatarUrl="";
	if($scope.user.gravatarEmail)
		$scope.gravatarUrl = "http://gravatar.com/avatar/"+md5($scope.user.gravatarEmail);
});