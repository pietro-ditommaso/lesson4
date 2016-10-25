/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: task-form.directive.js
 * @description: taskForm directive to wrap the form used to add or edit a task
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .directive('todoTaskForm', taskFormDirective);

  /**
	 * @description: taskForm directive function
	 * @returns: {Object=} Object to define taskForm directive
	 */
  function taskFormDirective() {
    var directive = {
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
    };

    return directive;
  }
})(window.angular)