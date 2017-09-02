/**
 * Main application controller
 *
 * you can have separate controllers for each logical section
 *
 */
;(function() {

    angular
      .module('techscan')
      .controller('MainController', MainController);

    MainController.$inject = ['$location', '$q', 'QueryService'];


    function MainController($location, $q, QueryService) {

      // 'controller as' syntax
      var self = this;
      var LANGUAGES = ['javascript', 'java', 'python', 'php', 'ruby'];

      self.getAllLanguageCount = getAllLanguageCount;
      self.getLanguageCount = getLanguageCount;
      self.search = search;

      self.languages = [];
      self.getAllLanguageCount();

      function getAllLanguageCount() {
        var promises = [];
        LANGUAGES.forEach(function (language) {
          promises.push(self.getLanguageCount(language));
        });

        $q.all(promises).then(function () {
          console.log('done getting language count');
        });
      }

      // TODO: move to api service
      /**
       * Load language count data
       * @return {Object} Returned promise object
       */
      function getLanguageCount(language) {
        return QueryService.query('GET', '/search/repositories', {q: language + 'language:' + language}, {})
        .then(function (data) {
          console.log(data);
          self.languages.push({
            name: language,
            count: data.data.total_count
          });
        });
      }

      function search(technology) {
        console.log('tets');
        $location.path('/repo/' + technology);
      }
    }
  })();