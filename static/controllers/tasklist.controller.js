/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @file: todo.controller.js
 * @description: This file contains the controller responsable for handling task list definition,
 * 							 new task addition, task deletion
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TasklistController', TasklistController);

  TasklistController.$inject = ['$mdDialog', 'taskStorage'];
	
	/**
	 * @description: tasklist directive controller function which handles task editing and checks task status
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
		 * @description: this function edits an existing task and updates browser local storage
		 * @param {Object=} task - Task to edit
		 * @param {string=} newTitle - New task title to update
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
		 * @description: this function provides dialog to edit a task
		 * @param {Object=} ev - The event fired on browser view
		 * @param {Object=} task - Task to edit
		 * @returns {undefined} Nothing returned
		 */
		function editTaskDialog(ev, task) {
			$mdDialog.show({
				template: '<md-dialog aria-label="Edit Task" flex="30">' +
										'<div layout="column" layout-align="space-between">' +
											'<h2 class="md-padding md-headline">Edit Task</h2>' +
											'<task-form task="taskdialogctrl.task" tags="taskdialogctrl.tags" today="taskdialogctrl.today"' +
																'save-task="taskdialogctrl.saveTask(form, task)" close-dialog="taskdialogctrl.closeDialog()" class="md-padding"></task-form>' +
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
		 * @description: this function provides dialog to show task information
		 * @param {Object=} ev - The event fired on browser view
		 * @param {Object=} task - Task to show
		 * @returns {undefined} Nothing returned
		 */
		function showTaskDialog(ev, task) {
			$mdDialog.show({
				templateUrl: '/templates/showTaskInfo.html',
				targetEvent: ev,
				locals: {
					task: task
				},
				controller: 'TaskDialogController',
				controllerAs: 'taskdialogctrl'
			}).then(function(){});
		};

		/**
		 * @description: this function updates browser local storage when a task is set as done
		 * @param {Object=} task - Task to set as done
		 * @returns {undefined} Nothing returned
		 */
		function toggleDone(task) {
			task.done = !task.done;

      taskStorage.set(vm.tasks);
    };

		/**
		 * @description: this function fills the array of tasks that user wants to delete
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
		 * @description: this function toggles task priority between 0 and 1 and updates browser local storage
		 * @param {Object=} task - Task whose toggling priority
		 * @returns {undefined} Nothing returned
		 */
		function togglePriority(task) {
      task.priority === 0 ? task.priority = 1 : task.priority = 0;

      taskStorage.set(vm.tasks);
    };

		/**
		 * @description: this function identifies task selected in browser view
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