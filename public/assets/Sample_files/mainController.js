function mainController($scope, $rootScope, $http, todoService, global) {
    $scope.heroes = [];
    $scope.search = function() {
        $http.get('http://gateway.marvel.com/v1/public/characters?name=Spider-man'+ global.apikey).then(function(res) {
            $scope.heroes.push(res.data.data.results[0]);
            console.log($scope.heroes);
        });

    };
    $scope.showComics = function(){
        $scope.comics = [];
        $scope.heroes[0].comics.items.map(function(value, index){
            $http.get(value.resourceURI +'?'+ global.apikey).then(function(res) {
                console.log(res.data.data.results[0]);
                $scope.comics.push(res.data.data.results[0]);
            });
            $http.post('https://script.googleapis.com/v1/scripts/1wPgpaW1pyN7kxVaj6kQDEb6llYFZBEK7tHUZUb0x1H1uXkHYpWHz4O4a:run&key=AIzaSyCv-4zrCU3gkIi0fCfs3WBrUX5PqsbX-AQ').then(function(){
                console.log(hola);
            });
        });


    };
    $scope.showEvents = function(){
        $scope.events = [];
        $scope.heroes[0].events.items.map(function(value, index){
            $http.get(value.resourceURI +'?'+ global.apikey).then(function(res) {
                console.log(res.data.data.results[0]);
                $scope.events.push(res.data.data.results[0]);
            });
        });

    };
}
