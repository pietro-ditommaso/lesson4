/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: user-config.service.js
 * @description: Here is defined the service which handles saving and retrieving of user's configurations in browser local storage
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .service('userConfig', userConfig);
  
  userConfig.$inject = ['$window'];
  
  /**
   * @description: userConfig service function which gets and sets user's configurations in browser local storage
   * @param {Object=} $window - native Angular service
   * @returns {undefined} Nothing returned
   */
  function userConfig($window) {
    this.get = get;
    this.set = set; 

    ////////////

    /**
     * @description: this function retrieves user's configurations from browser local storage 
     * @returns {Object} Object, where each property is a configuration
     */     
    function get() {
      var userconfig = $window.localStorage.getItem('userconfig');

      return angular.fromJson(userconfig);
    };

    /**
     * @description: this function saves user's configurations into browser local storage
     * @param {Object} userconfig - Object, where each property is a configuration
     * @returns {undefined} Nothing returned
     */
    function set(userconfig) {
      $window.localStorage.setItem('userconfig', angular.toJson(userconfig));
    };
  };

})(window.angular)