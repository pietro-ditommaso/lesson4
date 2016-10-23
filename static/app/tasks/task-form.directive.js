/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: taskForm.directive.js
 * @description: In this file is defined taskForm directive to wrap the form to add or edit a task
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .directive('taskForm', taskFormDirective);

  /**
	 * @description: taskForm directive function
	 * @returns: {Object=} Object to define taskForm directive
	 */
  function taskFormDirective() {
    return {
      restrict: 'E',
      scope: {
        task: '=',
        tags: '=',
        today: '=',
        saveTask: '&',
        closeDialog: '&'
      },
      bindToController: true,
      templateUrl: '/app/tasks/task-form.directive.html',
      controller: function(){},
      controllerAs: 'taskformctrl'
    }
  }
})(window.angular)