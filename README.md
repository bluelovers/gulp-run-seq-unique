# gulp-run-seq-unique

this hack make when we run a task like `run-sequence`, the dep task will not run > 1 time

## gulp.options.disableResetTask

by the default this value is `true`

when u wanna disable this hack like old `run-sequence` do, u can set value as `false`

## demo

### replace run-sequence

```
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

gulp.task('task-name', function ()
{
	return;
});

let callback = function (...ret)
{
	console.log(this, ret);
};

runSequence.use(gulp);
runSequence('task-name', callback);
```

to

```
import * as gulp from 'gulp';
import runSequence from 'gulp-run-seq-unique/run-sequence';

gulp.task('task-name', function ()
{
	return;
});

let callback = function (...ret)
{
	console.log(this, ret);
};

runSequence.use(gulp);
runSequence('task-name', callback);
```

### gulpfile.ts

```
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

```

### options.disableResetTask = false
```
[06:13:53] Starting '$option:disable'...
[06:13:53] dep task will run > 1 time
[06:13:53] Finished '$option:disable' after 149 μs
[06:13:53] Starting 'default:disable'...
[06:13:53] Starting '$dep1'...
[06:13:53] Finished '$dep1' after 13 μs
[06:13:53] Starting '$dep2'...
[06:13:53] Finished '$dep2' after 42 μs
[06:13:53] Starting 'task1'...
[06:13:53] Finished 'task1' after 26 μs
[06:13:53] Starting '$dep1'...
[06:13:53] Finished '$dep1' after 1.5 μs
[06:13:53] Starting '$dep2'...
[06:13:53] Finished '$dep2' after 1.2 μs
[06:13:53] Starting 'task2'...
[06:13:53] Finished 'task2' after 2.1 μs
[06:13:53] Finished 'default:disable' after 2.18 ms
```

### options.disableResetTask = true
```
[06:14:54] Starting '$option:enable'...
[06:14:54] all task will only run once (include dep task)
[06:14:54] Finished '$option:enable' after 158 μs
[06:14:54] Starting 'default:enable'...
[06:14:54] Starting '$dep1'...
[06:14:54] Finished '$dep1' after 11 μs
[06:14:54] Starting '$dep2'...
[06:14:54] Finished '$dep2' after 35 μs
[06:14:54] Starting 'task1'...
[06:14:54] Finished 'task1' after 11 μs
[06:14:54] Starting 'task2'...
[06:14:54] Finished 'task2' after 1.2 μs
[06:14:54] Finished 'default:enable' after 1.61 ms
```
