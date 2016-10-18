/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: tasklist.directive.js
 * @description: In this file is defined tasklist directive to wrap list of tasks logic and view
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
		.directive('tasklist', tasklistDirective);
	
	/**
	 * @description: tasklist directive function
	 * @returns: {Object=} Object to define tasklist directive
	 */
	function tasklistDirective() {
		return {
      scope: {
				tasks: '=',
				tasksOrder: '=',
				tasksToDelete: '=',
				searchTask: '=',
				selectedTask: '=',
				filterFunc: '=',
				view: '='
			},
			restrict: 'E',
			bindToController: true,
			controller: 'TasklistController',
			controllerAs: 'tasklistctrl',
			templateUrl: '/templates/tasklist.html'
		};
	};
	
})(window.angular)