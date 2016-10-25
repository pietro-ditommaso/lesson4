/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: user-config.service.js
 * @description: Service handling backup and retrieval of user's configurations saved in browser local storage
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .service('userConfig', userConfig);

  userConfig.$inject = ['$window'];

  /**
   * @description: Gets and sets user's configurations in browser local storage
   * @param {Object=} $window - native Angular service
   * @returns {undefined} Nothing returned
   */
  function userConfig($window) {
    this.get = get;
    this.set = set;

    ////////////

    /**
     * @description: Retrieves user's configurations from browser local storage
     * @returns {Object} Object, where each property is a configuration
     */
    function get() {
      var userconfig = $window.localStorage.getItem('userconfig');

      return angular.fromJson(userconfig);
    };

    /**
     * @description: Saves user's configurations to browser local storage
     * @param {Object} userconfig - Object, where each property is a configuration
     * @returns {undefined} Nothing returned
     */
    function set(userconfig) {
      $window.localStorage.setItem('userconfig', angular.toJson(userconfig));
    };
  };

})(window.angular)