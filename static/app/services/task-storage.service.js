/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: task-storage.service.js
 * @description: Here is defined the service which handles saving and retrieving of tasklist in browser local storage
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .service('taskStorage', taskStorage);
  
  taskStorage.$inject = ['$window'];
  
  /**
   * @description: taskStorage service function which gets and sets tasklist in browser local storage
   * @param {Object=} $window - native Angular service
   * @returns {undefined} Nothing returned
   */
  function taskStorage($window) {
    this.get = get;
    this.set = set; 

    ////////////

    /**
     * @description: this function retrieves tasklist from browser local storage 
     * @returns {Object[]} Array of objects, where each element contains every task information 
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
     * @description: this function saves tasklist into browser local storage
     * @param {Object[]} tasks - Array of objects, where each element contains every task information
     * @returns {undefined} Nothing returned
     */
    function set(tasks) {
      $window.localStorage.setItem('tasklist', angular.toJson(tasks));
    };
  };

})(window.angular)