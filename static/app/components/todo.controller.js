/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @file: todo.controller.js
 * @description: This file contains the controller responsable for handling task list definition,
 * 							 new task addition, task deletion
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TodoController', TodoController);
	
  TodoController.$inject = ['$mdDialog', 'taskStorage', 'userConfig'];
	
	/**
	 * @description: TodoController function
	 * @param {Object=} $mdDialog - Angular Material service to handle dialogs.
	 * @param {Object=} taskStorage - Custom service to handle browser local storage.
	 * @returns {undefined} Nothing returned
	 */
  function TodoController($mdDialog, taskStorage, userConfig) {
		var vm = this;
		vm.addTaskDialog = addTaskDialog;
		vm.allTasks = '';
    vm.deleteTaskDialog = deleteTaskDialog;
		vm.doneTasks = {done: true};
		vm.orders = [ 'title', 'date', 'work', 'priority' ];
		vm.selectedTask = null;
		vm.tasks = taskStorage.get() || [];
		vm.tasksOrder = {
			type: 'title',
			reverse: false
		}
		vm.tasksToDelete = [];
    vm.toDoTasks = {done: false};
		vm.toggleView = toggleView;
		vm.userConfig = userConfig.get() || {
			view: 'list'
		};
		
		////////////

		/**
		 * @description: This function adds a new task in tasklist and updates browser local storage
		 * @param {string=} [title=UnknownTask] - The title of the task
 		 * @param {string=} [date=Date.now()] - The date where the task is added
		 * @param {number=} [priority=0] - The priority of the task
		 * @returns {undefined} Nothing returned
		 */
    function addTask(task) {
			vm.tasks.push({
				title: task.title || 'UnknownTask',
				description: task.description || 'NoDescription',
				date: task.date || Date.now(),	
				priority: task.priority || 0,
				done: task.done || false,
				work: task.work || 24,
				tags: task.tags || []
			});

			taskStorage.set(vm.tasks);
		};

		/**
		 * @description: This function shows dialog to add a new task
		 * @param {Object=} ev - The event fired on browser view 
		 * @returns {undefined} Nothing returned
		 */
		function addTaskDialog(ev) {
			$mdDialog.show({
				template: '<md-dialog aria-label="Add Task" flex="30">' +
										'<div layout="column" layout-align="space-between">' +
											'<h2 class="md-padding md-headline">Add Task</h2>' +
											'<task-form task="taskdialogctrl.task" tags="taskdialogctrl.tags" today="taskdialogctrl.today"' +
             										'save-task="taskdialogctrl.saveTask(form, task)" close-dialog="taskdialogctrl.closeDialog()" class="md-padding"></task-form>' +
										'</div>' + 
									'</md-dialog>',
				targetEvent: ev,
				locals: {
					task: {
						priority: 0,
						done: false,
						tags: []
					}
				},
				controller: 'TaskDialogController',
				controllerAs: 'taskdialogctrl'
			}).then(function(task) {
				addTask(task);
			});
		};

		/**
		 * @description: This function deletes one or more tasks from tasklist and updates browser local storage
		 * @param {Object=} tasks - Tasks to remove
		 * @returns {undefined} Nothing returned
		 */
		function deleteTasks(tasks) {
			if(tasks.length > 0) {
				vm.tasks = vm.tasks.filter(function(task) {
					return tasks.indexOf(task) < 0; 
				});

				vm.tasksToDelete = [];

				taskStorage.set(vm.tasks);
			};
		};

		/**
		 * @description: This function shows dialog to delete a task from tasklist
		 * @param {Object=} ev - The event fired on browser view 
		 * @param {Object=} task - The task to remove
		 * @returns {undefined} Nothing returned
		 */
		function deleteTaskDialog(ev, tasks) {
			var countTasks = tasks.length > 1 ? tasks.length + ' tasks' : '1 task'; 

			if(tasks.length > 0) {
				var deleteDialog = $mdDialog.confirm()
														.title('Delete Task') 
														.textContent('Do you want to delete ' + countTasks + ' ?')
														.ariaLabel('delete task')
														.ok('Yes')
														.cancel('No')
														.targetEvent(ev)
				
				$mdDialog.show(deleteDialog).then(function() {
					deleteTasks(tasks);
				});
			};
		};

		/**
		 * @description: This function toggles view state and saves user's configurations in browser local storage
		 * @returns {undefined} Nothing returned
		 */
		function toggleView() {
			vm.userConfig.view === 'list' ? vm.userConfig.view = 'card' : vm.userConfig.view = 'list';

			userConfig.set(vm.userConfig);
		};
	};

})(window.angular)