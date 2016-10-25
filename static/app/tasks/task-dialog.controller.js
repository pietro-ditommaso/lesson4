/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: task-dialog.controller.js
 * @description: Controller of the dialog for adding a new task or for editing an existing one
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TaskDialogController', TaskDialogController);

  TaskDialogController.$inject = ['$mdDialog', 'task'];

  /**
   * @description: Resolves or rejects   the dialog for adding or editing a task
   * @param {Object=} $mdDialog - Angular Material native service
   * @param {Object=} task - Task to add or edit
   * @returns {undefined} Nothing returned
   */
  function TaskDialogController($mdDialog, task) {
    var vm = this;
    vm.closeDialog = closeDialog;
    vm.saveTask = saveTask;
    vm.tags = ['work', 'house', 'family', 'holiday', 'friends', 'hard', 'easy', 'money', 'university', 'school', 'company'];
    vm.task = angular.copy(task);
    vm.today = new Date();

    ////////////

    /**
     * @description: Resolves the dialog for task saving
     * @param {Object=} form - This is the form filled with information of the task to add or edit
     * @param {Object=} task - The task
     * @returns {undefined} Nothing returned
     */
    function saveTask(form, task) {
      if(form.$valid && task.tags.length > 0) {
        $mdDialog.hide(task);
      }
    };

    /**
     * @description: Rejects the dialog for task saving
     * @returns {undefined} Nothing returned
     */
    function closeDialog() {
      $mdDialog.cancel();
    };
  };

})(window.angular)