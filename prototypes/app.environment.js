(function () {
    'use strict';

    angular.module('app.environment', []);

    angular.module('app.environment')
        .constant('environmentProperties', {
            isMobile: (function () {
                var ua = navigator.userAgent;
                return !!(ua.match(/Android/i) || ua.match(/BlackBerry/i) || ua.match(/iPhone|iPad|iPod/i) || ua.match(/Opera Mini/i) || ua.match(/IEMobile/i));
            })(),
            isAndroid: (function () {
                var ua = navigator.userAgent;
                return !!ua.match(/Android/i);
            })(),
            isAndroidPhone: (function () {
                var ua = navigator.userAgent;
                return !!ua.match(/Android/i) && !!ua.match(/mobile/i);
            })(),
            isIframe: (function () {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            })()
        });

    angular.module('app.environment')
        .controller('ConstantsCtrl', ['environmentProperties', 'accessibilityService', function (environmentProperties, accessibilityService) {
            var constantsCtrl = this;

            constantsCtrl.environment = environmentProperties;
        }]);

    //Utilities
    angular.module('app.environment')
        .factory('statePersister', [function () {
            var services = {
                saveState: saveState,
                loadState: loadState,
                saveLocal: saveLocal,
                loadLocal: loadLocal
            };
            return services;

            function saveState(stateProperty, stateObject) {
                if(window.sessionStorage){
                    window.sessionStorage[stateProperty] = angular.toJson(stateObject);
                }
            }

            function loadState(stateProperty) {
                return window.sessionStorage ? angular.fromJson(window.sessionStorage[stateProperty]) : '';
            }

            function saveLocal(stateProperty, stateObject) {
                if(window.localStorage){
                    window.localStorage[stateProperty] = angular.toJson(stateObject);
                }
            }

            function loadLocal(stateProperty) {
                return window.localStorage ? angular.fromJson(window.localStorage[stateProperty]) : '';
            }
        }]);

    angular.module('app.environment')
        .factory('Debounce', ['$timeout', function ($timeout) {
            return function (callback, debounceTime) {
                var timeoutPromise;

                return function () {
                    var self = this,
                    args = Array.prototype.slice.call(arguments);

                    if (timeoutPromise) {
                        $timeout.cancel(timeoutPromise);
                    }

                    timeoutPromise = $timeout(function () {
                        callback.apply(self, args);
                    }, debounceTime);
                };
            };
        }]);

    //Accessibility components
    angular.module('app.environment')
        .directive('accessibilityToggle', ['accessibilityService', function(accessibilityService){
            return {
                replace: true,
                restrict: 'AE',
                scope: true,
                controller: 'ConstantsCtrl',
                controllerAs: 'constantsCtrl',
                link: function(scope, element, attr, ctrl){
                    var onText = 'Screen reader friendly mode is on. Click to turn off.',
                        offText = 'Using a screenreader? Click here for a better experience.';

                    scope.accessibilityMode = accessibilityService.accessibilityMode;

                    scope.setAccessibilityMode = function(){
                        accessibilityService.setAccessibilityMode();
                        scope.accessibilityMode = accessibilityService.accessibilityMode;
                        setButtonText();
                    }

                    function setButtonText(){
                        scope.buttonText = scope.accessibilityMode ? onText : offText;
                    }
                    setButtonText();
                },
                template: function(){
                    return '<button class="sr-only" data-ng-click="setAccessibilityMode()">{{buttonText}}</button>';
                }
            };
        }]);

    angular.module('app.environment')
        .service('accessibilityService', ['statePersister', function (statePersister) {
            this.accessibilityMode = statePersister.loadState('accessibilityMode') || false;

            this.setAccessibilityMode = function () {
                this.accessibilityMode = !this.accessibilityMode;
                statePersister.saveState('accessibilityMode', this.accessibilityMode);
            };
        }]);
})();