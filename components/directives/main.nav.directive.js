;(function() {

  'use strict';

  /**
   * Main navigation, just a HTML template
   * @author Maheshwar Tigadi
   * @ngdoc  Directive
   *
   * @example
   * <main-nav><main-nav/>
   *
   */
  angular
    .module('techscan')
    .directive('mainNav', tinMainNav);

  function tinMainNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/main-nav.html'
    };

    return directiveDefinitionObject;
  }

})();