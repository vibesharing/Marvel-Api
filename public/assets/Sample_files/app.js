function config($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController',
	})
		.when('/ini', {
			templateUrl: 'views/ini.html',
		});
}

function run($rootScope, $location){
	var path = function() { return $location.path(); };
	$rootScope.$watch(path, function(newVal, oldVal){
		$rootScope.activetab = newVal;
	});
}


angular.module('app', ['ngRoute'])
    .config(config)
    .controller('mainController', mainController)
    .service('todoService', todoService)
		.factory('global', function() {
    return {
        apikey: '&apikey=cb0bc9a0f458188151bba2ba8f80ed84&ts=1&hash=bc53965699b1912ffd190bee692cbfbe'
    };
  })
    /*.factory('', )*/
    .run(run);
