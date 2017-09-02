/**
 *
 * AngularJS techscan
 * @description           Description
 * @author                Maheshwar Tigadi
 * @version               0.0.1
 * @date                  September 2017
 * @license               MIT
 *
 */
(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('techscan', [
      'ngRoute'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/techscan/technologies', {
        templateUrl: 'views/technologies.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/repo/:repository', {
        templateUrl: 'views/repositories.html',
        controller: 'RepositoriesController',
        controllerAs: 'repositories'
      })
      .otherwise({
        redirectTo: '/techscan/technologies'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   *
   */
  angular
    .module('techscan')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          console.log('error');
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('techscan')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();