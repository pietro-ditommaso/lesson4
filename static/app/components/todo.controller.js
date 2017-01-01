/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @file: todo.controller.js
 * @description: This file contains the controller responsible for tasklist definition,
 * 				 new task addition, task deletion and setting user's configurations
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TodoController', TodoController);

  TodoController.$inject = ['$mdDialog', 'taskStorage', 'userConfig'];

	/**
	 * @description: TodoController function
	 * @param {Object=} $mdDialog - Angular Material service to handle dialogs.
	 * @param {Object=} taskStorage - Custom service to handle tasks in browser local storage.
	 * @param {Object=} userConfig - Custom service to handle user's configurations in browser local storage.
	 * @returns {undefined} Nothing returned
	 */
  function TodoController($mdDialog, taskStorage, userConfig) {
		var vm = this;
		vm.addTaskDialog = addTaskDialog;
		vm.allTasks = '';
    vm.deleteTaskDialog = deleteTaskDialog;
		vm.doneTasks = {done: true};
		vm.orders = [ 'title', 'date', 'work', 'priority' ];
		vm.selectedTags = [];
		vm.selectedTask = null;
		vm.setTasksOrder = setTasksOrder;
		vm.tags = ['work', 'house', 'family', 'holiday', 'friends', 'hard', 'easy', 'money', 'university', 'school', 'company'];
		vm.tasks = taskStorage.get() || [];
		vm.tasksToDelete = [];
    vm.toDoTasks = {done: false};
    vm.toggleSelectedTag = toggleSelectedTag;
		vm.toggleView = toggleView;
		vm.userConfig = userConfig.get() || {
			tasksOrder: {
				type: 'title',
				reverse: false
			},
			view: 'list'
		};

		////////////

		/**
		 * @description: This function adds a new task in tasklist and updates browser local storage
		 * @param {Object=} task - The task to add
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
				tags: task.tags || [],
				showInfo: false
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
											'<todo-task-form task="taskdialogctrl.task" tags="taskdialogctrl.tags" today="taskdialogctrl.today"' +
             										'save-task="taskdialogctrl.saveTask(form, task)" close-dialog="taskdialogctrl.closeDialog()" class="md-padding"></todo-task-form>' +
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
		 * @description: This function shows dialog to delete one or more tasks from tasklist
		 * @param {Object=} ev - The event fired on browser view 
		 * @param {Object=} tasks - The tasks to remove
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
		 * @description: Function to set tasks order and save in user's configurations in browser local storage
		 * @param: {Boolean=} reverse - A boolean to specify if the order is ascendant or descendant
		 * @returns: {undefined} Nothing returned
		 */
		function setTasksOrder(reverse) {
			if(reverse != null) {
				vm.userConfig.tasksOrder.reverse = reverse;
			};

			userConfig.set(vm.userConfig);
		};

		/**
		 * @description: Function to insert/remove a tag to selected ones
		 * @param: {String=} tag - Tag to be inserted/removed
		 * @returns: {undefined} Nothing returned
		 */
		function toggleSelectedTag(tag) {
			var index = vm.selectedTags.indexOf(tag);

			if(index > -1) {
				vm.selectedTags.splice(index, 1);
			}
			else vm.selectedTags.push(tag);

			console.log(vm.selectedTags);
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