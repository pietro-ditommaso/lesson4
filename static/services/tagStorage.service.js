/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: tagStorage.service.js
 * @description: Here is defined the service which handles saving and retrieving of tags in browser local storage
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .service('tagStorage', tagStorage);
  
  tagStorage.$inject = ['$window'];
  
  /**
   * @description: tagStorage service function which gets and sets tags in browser local storage
   * @param {Object=} $window - native Angular service
   * @returns {undefined} Nothing returned
   */
  function tagStorage($window) {
    this.get = get;
    this.set = set; 

    ////////////

    /**
     * @description: this function gets tags from browser local storage 
     * @returns {Object[]} Array of objects, where each element is a tag
     */     
    function get() {
      var tags = $window.localStorage.getItem('tags');
      
      return angular.fromJson(tags);
    };

    /**
     * @description: this function saves tags into browser local storage
     * @param {Object[]} tags - Array of objects, where each element is a tag
     * @returns {undefined} Nothing returned
     */
    function set(tags) {
      $window.localStorage.setItem('tags', angular.toJson(tags));
    };
  };

})(window.angular)