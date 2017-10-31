/**
 * Created by user on 2017/11/1/001.
 */

import * as gulp from 'gulp';
import runSequenceUnique from '.';
import addTasks from 'gulp-add-tasks2';
import * as gutil from 'gulp-util';

runSequenceUnique(gulp);

const addGulpTasks = addTasks(gulp);

addGulpTasks({

	'default': {

		tasks: [
			'default:enable'
		],

	},

	'default:enable': {

		deps: [
			'$option:enable'
		],

		tasks: [
			'task1',
			'task2',
		],
	},

	'default:disable': {

		deps: [
			'$option:disable'
		],

		tasks: [
			'task1',
			'task2',
		],
	},

	'$dep1': () => {},
	'$dep2': () => {},

	'task1': {

		deps: [
			'$dep1',
			'$dep2',
		],

	},

	'task2': {

		deps: [
			'$dep1',
			'$dep2',
		],

	},

	'$option:disable': () =>
	{
		gulp.options.disableResetTask = false;

		gutil.log(`dep task will run > 1 time`);
	},

	'$option:enable': () =>
	{
		gulp.options.disableResetTask = true;

		gutil.log(`all task will only run once (include dep task)`);
	},

});
