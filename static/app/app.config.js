/**
 * @author: Pietro Di Tommaso, Francesco Pira
 * @file: app.config.js
 * @description: 'toDoApp' module configurations
 */

(function(angular) {
  'use strict';

  angular.module('toDoApp')
    .config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
				if(date) {
					var day = date.getDate();
					var monthIndex = date.getMonth();
					var year = date.getFullYear();

					return day + '/' + (monthIndex + 1) + '/' + year;
				}
				else return null;
			};
    });
})(window.angular)