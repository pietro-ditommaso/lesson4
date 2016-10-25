/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: task-storage.service.js
 * @description: Service handling backup and retrieval of tasklist saved in browser local storage
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .service('taskStorage', taskStorage);

  taskStorage.$inject = ['$window'];

  /**
   * @description: Gets and sets the whole tasklist in browser local storage
   * @param {Object=} $window - native Angular service
   * @returns {undefined} Nothing returned
   */
  function taskStorage($window) {
    this.get = get;
    this.set = set;

    ////////////

    /**
     * @description: Retrieves the whole tasklist from browser local storage
     * @returns {Object[]} An array of objects where each element contains information of each task
     */
    function get() {
      var tasks = $window.localStorage.getItem('tasklist');

      var jsonTasks = angular.fromJson(tasks);

      if(jsonTasks){
        jsonTasks.forEach(function(task) {
          task.date = new Date(task.date);
        });
      };

      return jsonTasks;
    };

    /**
     * @description: Saves the whole tasklist to browser local storage
     * @param {Object[]} tasks - Array of objects, where each element contains every task information
     * @returns {undefined} Nothing returned
     */
    function set(tasks) {
      $window.localStorage.setItem('tasklist', angular.toJson(tasks));
    };
  };

})(window.angular)