/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @file: tasklist.controller.js
 * @description: This file contains the controller of tasklist directive
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TasklistController', TasklistController);

  TasklistController.$inject = ['$mdDialog', 'taskStorage'];

	/**
	 * @description: Handles task editing and deletion, shows task information and checks task status
	 * @param {Object=} $mdDialog - Angular Material service to handle dialogs.
	 * @param {Object=} taskStorage - Custom service to handle browser local storage.
	 * @returns: {undefined} Nothing returned
	 */
	function TasklistController($mdDialog, taskStorage) {
		var vm = this;
		vm.editTaskDialog = editTaskDialog;
		vm.showTaskDialog = showTaskDialog;
		vm.toggleDone = toggleDone;
		vm.toggleMultiDelete = toggleMultiDelete;
		vm.togglePriority = togglePriority;
		vm.toggleSelection = toggleSelection;

		////////////

		/**
		 * @description: Edits an existing task and updates browser local storage
		 * @param {Object=} newTask - Task with new information
		 * @param {Object=} prevTask - Task to edit
		 * @returns {undefined} Nothing returned
		 */
		function editTask(newTask, prevTask) {
			var index = vm.tasks.indexOf(prevTask);

			if(index > -1) {
				vm.tasks[index] = newTask;

				taskStorage.set(vm.tasks);
			}
		};

		/**
		 * @description: Provides dialog to edit a task
		 * @param {Object=} ev - The event fired on browser view
		 * @param {Object=} task - Task to edit
		 * @returns {undefined} Nothing returned
		 */
		function editTaskDialog(ev, task) {
			$mdDialog.show({
				template: '<md-dialog aria-label="Edit Task" flex="30">' +
										'<div layout="column" layout-align="space-between">' +
											'<h2 class="md-padding md-headline">Edit Task</h2>' +
											'<todo-task-form task="taskdialogctrl.task" tags="taskdialogctrl.tags" today="taskdialogctrl.today"' +
																'save-task="taskdialogctrl.saveTask(form, task)" close-dialog="taskdialogctrl.closeDialog()" class="md-padding"></todo-task-form>' +
										'</div>' + 
									'</md-dialog>',
				targetEvent: ev,
				locals: {
					task: task
				},
				controller: 'TaskDialogController',
				controllerAs: 'taskdialogctrl'
			}).then(function(newTask) {
				editTask(newTask, task);
			});
		};

		/**
		 * @description: Provides dialog to show task information
		 * @param {Object=} ev - The event fired on browser view
		 * @param {Object=} task - Task to show
		 * @returns {undefined} Nothing returned
		 */
		function showTaskDialog(ev, task) {
			$mdDialog.show({
				templateUrl: '/app/tasks/show-task-info.template.html',
				targetEvent: ev,
				locals: {
					task: task
				},
				controller: 'TaskDialogController',
				controllerAs: 'taskdialogctrl'
			}).then(function(){});
		};

		/**
		 * @description: Updates browser local storage when a task is set as done
		 * @param {Object=} task - Task to set as done
		 * @returns {undefined} Nothing returned
		 */
		function toggleDone(task) {
			task.done = !task.done;

      taskStorage.set(vm.tasks);
    };

		/**
		 * @description: Fills the array of tasks that user wants to delete
		 * @param {Object=} task - Task to push or splice from array
		 * @returns {undefined} Nothing returned
		 */
		function toggleMultiDelete(task) {
			var index = vm.tasksToDelete.indexOf(task);

			if(index > -1) {
				vm.tasksToDelete.splice(index, 1);
			}
			else {
				vm.tasksToDelete.push(task);
			};
    };

		/**
		 * @description: Toggles task priority between 0 and 1 and updates browser local storage
		 * @param {Object=} task - Task whose toggling priority
		 * @returns {undefined} Nothing returned
		 */
		function togglePriority(task) {
      task.priority === 0 ? task.priority = 1 : task.priority = 0;

      taskStorage.set(vm.tasks);
    };

		/**
		 * @description: Identifies task selected in browser view
		 * @param {Object=} task - Task selected
		 * @returns {undefined} Nothing returned
		 */
		function toggleSelection(task) {
			if(vm.selectedTask != task) {
				vm.selectedTask = task;
			}
			else vm.selectedTask = null;
		};
	};


})(window.angular)