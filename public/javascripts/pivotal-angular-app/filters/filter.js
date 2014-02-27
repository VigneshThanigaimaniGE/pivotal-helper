app.filter('addLastViewed',function(){
	return function(placeholder, num1){
		var passedDateObj = new Date(num1);
		var passedDate = passedDateObj.getDate();
		var todayDate = new Date(Date.now());
		var difference = todayDate.getDate() - passedDate;
		switch(difference){
			case 0:
				return placeholder+" Today";
			case 1:
				return placeholder+" Yesterday";
			default:
				return placeholder+" "+difference+" days ago";
		}
	}
});