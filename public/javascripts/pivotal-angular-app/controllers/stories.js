app.controller('stories',function($scope){
	$scope.stories = renderedStories;
	$scope.user = userObj;
	$scope.views = [
                    {
                        value: "board",
                        text: "Board View"
                    },
                    {
                        value: "desk",
                        text: "Desk View"
                    }
                    ];
	$scope.gravatarUrl="";
	$scope.selectedView = 'board';
	if($scope.user.gravatarEmail)
		$scope.gravatarUrl = "http://gravatar.com/avatar/"+md5($scope.user.gravatarEmail)+"?s=150";

	$scope.changeView = function() {
		if($scope.selectedView == 'board') {
			angular.element('.board').show();
			angular.element('.desk').hide();
		} else {
			angular.element('.desk').show();
			angular.element('.board').hide();
		}
	}

	//function to print each story/board card individually.
	$scope.printCard = function(obj){
		var printElement = $(obj.target).parent();
		var newWindow =	window.open('', 'PrintWindow', 'width=900,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
		newWindow.document.write("<!DOCTYPE html><html>\n<head>\n</head><body class='printWindow print-page-wrap'>\n"
		+ getHTML(printElement[0],true) + "\n</body>\n</html>");


		//http://www.phpied.com/when-is-a-stylesheet-really-loaded/
		var style = newWindow.document.createElement('style');
		style.textContent = '@import "/stylesheets/style.css"; '
							+'@import "/stylesheets/pivotal.css"; '
							+'@import "/stylesheets/print.css"; '
							+'@import "/stylesheets/font-awesome/css/font-awesome.css"; '
							+'@import "http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700"; '
							+'@import "/stylesheets/structure.css"; ';
		var fi = setInterval(function(){
			try{
				style.sheet.cssRules;
				if(/Firefox/.test(window.navigator.userAgent)){
					//close then print order works in firefox
					newWindow.close();
					newWindow.print();
				}
				else if(/MSIE/.test(window.navigator.userAgent)){
					//print is currently not working in IE for some reason, need to fix this.
					//thus giving user a message to manually print it.
					newWindow.alert("Please Print by either \n1.Right Click -> Print\n 2.Ctrl+P ");
					newWindow.print(); //do not close for IE.
				}
				else{
					//print then close after particular time, works in chrome.
					newWindow.print();
					setTimeout(function(){
						newWindow.close();
					},4000);
				}
				clearInterval(fi);
			}
			catch(e){}
		},10);
		newWindow.document.head.appendChild(style);
	}
});