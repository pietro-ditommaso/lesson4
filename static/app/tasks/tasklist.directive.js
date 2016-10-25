/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: tasklist.directive.js
 * @description: In this file is defined tasklist directive to wrap list of tasks logic and view
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
		.directive('todoTasklist', tasklistDirective);

	/**
	 * @description: tasklist directive function
	 * @returns: {Object=} Object to define tasklist directive
	 */
	function tasklistDirective() {
		var directive = {
			restrict: 'E',
      scope: {
				tasks: '=',
				tasksOrder: '=',
				tasksToDelete: '=',
				searchTask: '=',
				selectedTask: '=',
				filterFunc: '=',
				view: '='
			},
			bindToController: true,
			controller: 'TasklistController',
			controllerAs: 'tasklistctrl',
			templateUrl: '/app/tasks/tasklist.directive.html'
		};

		return directive;
	};

})(window.angular)