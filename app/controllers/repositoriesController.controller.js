(function() {

  angular
    .module('techscan')
    .controller('RepositoriesController', RepositoriesController);

  RepositoriesController.$inject = ['$routeParams', 'CONSTANTS', 'QueryService'];


  function RepositoriesController($routeParams, CONSTANTS, QueryService) {

    // 'controller as' syntax
    var self = this;
    self.flag = true;
    self.menu = false;
    self.repository = $routeParams.repository;
    self.prev_page = 0;
    self.current_page = 1;
    self.next_page = 5;

    self.getAllLanguagesCount = getAllLanguagesCount;
    self.getLanguageCount = getLanguageCount;
    self.getRepositories = getRepositories;
    self.initPage = initPage;
    self.prevPage = prevPage;
    self.nextPage = nextPage;
    self.searchRepo = searchRepo;

    self.getRepositories();

    // TODO: use lodash to group by languages or BE changes
    function getAllLanguagesCount(url) {
      return QueryService.query('GET', url.replace(CONSTANTS.API_URL, ''))
      .then(function (data) {
        console.log(data);
        var languages = Object.keys(data.data);
        self.languages = [];
        if (languages.length) {
          languages.forEach(function (language) {
            console.log(language);
            self.getLanguageCount(language);
          });
        }
      });
    }

    // TODO: move to api service
    /**
     * Load language count data
     * @return {Object} Returned promise object
     */
    function getLanguageCount(language) {
      return QueryService.query('GET', '/search/repositories', {q: self.repository + 'language:' + language}, {})
      .then(function (data) {
        console.log(data);
        self.languages.push({
          name: language,
          count: data.data.total_count
        });
      });
    }

    function getRepositories() {

      /**
      * Load some data
      * @return {Object} Returned object
      */
      self.loading = true;
      return QueryService.query('GET', '/search/repositories', {q: self.repository, page: self.current_page, per_page: CONSTANTS.PAGE_SIZE}, {})
        .then(function(repositories) {
          console.log(repositories);
          self.total_count = repositories.data.total_count;
          self.initPage();
          self.repositories = repositories.data.items;
          if (self.flag && repositories.data.total_count > 0) {
            self.flag = false;
            self.getAllLanguagesCount(repositories.data.items[0].languages_url);
          }
        }).finally(function () {
          self.loading = false;
        });

    }

    function initPage() {
      var pages = self.total_count / CONSTANTS.PAGE_SIZE
      self.prev_page = self.current_page - 1 != 0 ? self.current_page : 0;
      self.next_page = self.current_page + 1 <= pages ? self.current_page : 0;
    }

    function prevPage() {
      if (self.loading) {
        return;
      }
      self.current_page = self.prev_page - 1;
      self.getRepositories();
    }

    function nextPage() {
      if (self.loading) {
        return;
      }
      self.current_page = self.next_page + 1;
      self.getRepositories();
    }

    function searchRepo() {
      self.current_page = 1;
      self.getRepositories();
    }
  }


})();