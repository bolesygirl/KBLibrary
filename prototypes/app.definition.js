var app = angular.module('app', [
    'app.environment',
    'app.widgetCreator'
]);

app
    .config(['$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }])
    .config(['$controllerProvider', '$provide', '$compileProvider', function ($controllerProvider, $provide, $compileProvider) {
        app.registerController = function (name, definition) {
            $controllerProvider.register(name, definition);
            return this;
        };

        app.registerService = function (name, definition) {
            $provide.service(name, definition);
            return this;
        };

        app.registerFactory = function (name, definition) {
            $provide.factory(name, definition);
            return this;
        };

        app.registerDirective = function (name, definition) {
            $compileProvider.directive(name, definition);
            return this;
        };

        $provide.decorator("$q", ['$delegate', function ($delegate) {
            function allSettled(promises) {
                var deferred = $delegate.defer(),
                    counter = 0,
                    results = angular.isArray(promises) ? [] : {};

                angular.forEach(promises, function (promise, key) {
                    counter++;
                    $delegate.when(promise).then(function (value) {
                        if (results.hasOwnProperty(key)) return;
                        results[key] = { status: "fulfilled", value: value };
                        if (!(--counter)) deferred.resolve(results);
                    }, function (reason) {
                        if (results.hasOwnProperty(key)) return;
                        results[key] = { status: "rejected", reason: reason };
                        if (!(--counter)) deferred.resolve(results);
                    });
                });

                if (counter === 0) {
                    deferred.resolve(results);
                }

                return deferred.promise;
            }

            $delegate.allSettled = allSettled;
            return $delegate;
        }]);
    }]);