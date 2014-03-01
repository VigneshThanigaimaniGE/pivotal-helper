app.filter('addLastViewed',function(){
	return function(placeholder, num1){
		var passedDate = new Date(num1);
		var difference = Math.floor((Date.now() - passedDate )/(60*60*24*1000));
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