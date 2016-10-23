/**
 * @authors: Pietro Di Tommaso, Francesco Pira
 * @filename: taskDialog.controller.js
 * @description: Here it's defined Controller for handling dialog to add a new task
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .controller('TaskDialogController', TaskDialogController);

  TaskDialogController.$inject = ['$mdDialog', 'task'];

  /**
   * @description: Controller function responsable to add a new task
   * @param {Object=} $mdDialog - Angular Material native service
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
     * @description: function responsable to close dialog and add a new task
     * @param {Object=} form - This is the form filled with information of the new task
     * @param {Object=} task - The new task
     * @returns {undefined} Nothing returned
     */
    function saveTask(form, task) {
      if(form.$valid && task.tags.length > 0) {
        $mdDialog.hide(task);
      }
    };

    /**
     * @description: function responsable to close dialog
     * @returns {undefined} Nothing returned
     */
    function closeDialog() {
      $mdDialog.cancel();
    };
  };

})(window.angular)