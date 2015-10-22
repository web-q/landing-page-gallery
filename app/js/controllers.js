landingPageWiz.controller('templatesCtrl', function($scope) {
	$scope.templates = [
	    {"title":"Dictionary", "description":"its a Dictionary"},
	    {"title":"Parallax", "description":"le Parallax"},
	    {"title":"Clean Grid", "description":"vClean"},
	]
});

landingPageWiz.controller('examplesCtrl', function($scope) {
	$scope.examples = [
	    {"title":"hobbspitul", "url":"http://google.com"},
	    {"title":"medicineland", "url":"http://yahoo.com"},
	    {"title":"healfff", "url":"http://aol.com"}
	]
});
