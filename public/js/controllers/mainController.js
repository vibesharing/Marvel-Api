function mainController($scope, $rootScope, $http, mainService, global) {
    $scope.heroes = [];
    $scope.results = [];
    $scope.content = [];

    function load() {
        $('.ui.search')
            .search({
                source: $scope.content
            });
    }
    $scope.search = function() {
        $scope.content = [];
        $http.get('http://gateway.marvel.com/v1/public/characters?nameStartsWith=' + $scope.searchTerm + global.apikey).then(function(res) {
            // $scope.heroes.push(res.data.data.results);
            res.data.data.results.map(function(value, index) {
                $scope.content.push({
                    title: value.name
                });

            });

            load();
            angular.element(document.getElementsByClassName("title")).on('click', function(){
                $http.get('http://gateway.marvel.com/v1/public/characters?name=' + $(this).html() + global.apikey).then(function(res) {
                    $scope.heroes.push(res.data.data.results[0]);
                    console.log(res.data.data.results);

                    console.log($scope.heroes);
                });

            });
        });

    };
    // $scope.searchFinal = function() {
    //     $http.get('http://gateway.marvel.com/v1/public/characters?name=' + $scope.searchTerm + global.apikey).then(function(res) {
    //         $scope.heroes.push(res.data.data.results[0]);
    //         console.log(res.data.data.results);
    //
    //         console.log($scope.heroes);
    //     });
    // }
    $scope.showComics = function() {
        $scope.comics = [];
        $scope.heroes[0].comics.items.map(function(value, index) {
            $http.get(value.resourceURI + '?' + global.apikey).then(function(res) {
                // console.log(res.data.data.results[0]);
                // get the Year + Month
                var x = [];
                x = res.data.data.results[0].dates[0].date.split('-');
                //Get the Day
                var y = x[2];
                y = y.split('T');
                var result = [];
                result.push(x[0]);
                result.push(x[1]);
                result.push(y[0]);
                //Result == Year + Month + display
                for (var i = 0; i <= 5; i++) {
                    result.push('');
                }
                //Result += title & description
                result.push(res.data.data.results[0].title);
                result.push(res.data.data.results[0].description);
                //Result += media link
                var thumbnail = res.data.data.results[0].thumbnail.path + '.' + res.data.data.results[0].thumbnail.extension;
                result.push(thumbnail);
                console.log(result.join('ç'));
                result = result.join('ç');
                console.log(result);
                //Result: ready
                $scope.results.push(result);
                $scope.comics.push(res.data.data.results[0]);
                callScriptFunction(result);

            });
        });


    };
    $scope.showEvents = function() {
        $scope.events = [];
        $scope.heroes[0].events.items.map(function(value, index) {
            $http.get(value.resourceURI + '?' + global.apikey).then(function(res) {
                console.log(res.data.data.results[0]);
                $scope.events.push(res.data.data.results[0]);
            });
        });

    };









    //========================================================================================================================

    function callScriptFunction(x) {
        var scriptId = "1wPgpaW1pyN7kxVaj6kQDEb6llYFZBEK7tHUZUb0x1H1uXkHYpWHz4O4a";

        // Create an execution request object.
        var request = {
            'function': 'createAndSendDocument2',
            'parameters': x
        };

        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });

        op.execute(function(resp) {
            if (resp.error && resp.error.status) {
                // The API encountered a problem before the script
                // started executing.
                appendPre('Error calling API:');
                appendPre(JSON.stringify(resp, null, 2));
            } else if (resp.error) {
                // The API executed, but the script returned an error.

                // Extract the first (and only) set of error details.
                // The values of this object are the script's 'errorMessage' and
                // 'errorType', and an array of stack trace elements.
                var error = resp.error.details[0];
                appendPre('Script error message: ' + error.errorMessage);

                if (error.scriptStackTraceElements) {
                    // There may not be a stacktrace if the script didn't start
                    // executing.
                    appendPre('Script error stacktrace:');
                    for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                        var trace = error.scriptStackTraceElements[i];
                        appendPre('\t' + trace.function+':' + trace.lineNumber);
                    }
                }
            } else {
                // The structure of the result will depend upon what the Apps
                // Script function returns. Here, the function returns an Apps
                // Script Object with String keys and values, and so the result
                // is treated as a JavaScript object (folderSet).
                var folderSet = resp.response.result;
                if (Object.keys(folderSet).length == 0) {
                    appendPre('No folders returned!');
                } else {
                    appendPre('Folders under your root folder:');
                    Object.keys(folderSet).forEach(function(id) {
                        appendPre('\t' + folderSet[id] + ' (' + id + ')');
                    });
                }
            }
        });
    }
    //========================================================================================================================

}
