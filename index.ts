/**
 * Created by user on 2017/11/1/001.
 */

import * as Gulp from 'gulp';
import * as Orchestrator from 'orchestrator';
import * as gutil from 'gulp-util';

export type vGulp = Gulp.Gulp | Orchestrator;

export interface I_resetTask extends Function
{
	(task: ITask): void;
}

export interface ITask
{
	fn: Function;
	dep: string[];
	name: string;

	done?: boolean;
}

export interface ITasks
{
	[index: string]: ITask;
}

export interface IGulp
{
	task: Function;
	start: Function;

	seq: string[];
	tasks: ITasks;

	[index: string]: any;
}

export interface IGulpMixed extends IGulp
{
	Gulp?: IGulpMixed;

	options?: IOptions;

	_resetTask?: I_resetTask;
}

export interface IOptions
{
	disableResetTask?: boolean;

	[index: string]: any;
}

export function init(gulp?: IGulpMixed): IGulpMixed
{
	if (!gulp)
	{
		// @ts-ignore
		gulp = require("gulp");
	}

	return use(gulp);
}

export function use(gulp: IGulpMixed): IGulpMixed
{
	let cb: I_resetTask;

	if (gulp.Gulp && gulp.Gulp.prototype._resetTask)
	{
		// gulp
		cb = gulp.Gulp.prototype._resetTask;
	}
	else if (gulp.prototype._resetTask)
	{
		// Orchestrator
		cb = gulp.prototype._resetTask;
	}
	else
	{
		// gulp or other gulp like
		cb = Orchestrator.prototype._resetTask;
	}

	gulp.options = gulp.options || {
		disableResetTask: true,
	} as IOptions;

	gulp._resetTask = function (task: ITask, ...argv)
	{
		if (task && task.done && this.options && (this.options as IOptions).disableResetTask)
		{
			/*
			if (task.name == 'default:enable')
			{
				console.log(task.done, this.options, task);
			}

			console.log(task.name);
			*/
		}
		else
		{
			return cb.call(this, task, ...argv);
		}
	};

	/*
	gulp.resetAllTasks = function ()
	{
		return resetAllTasks(this);
	};
	*/

	return gulp;
}

export function resetAllTasks(gulp: IGulpMixed)
{
	if (!gulp.options || typeof gulp.options.disableResetTask == 'undefined')
	{
		//throw new Error(`This gulp not use with gulp-run-seq-unique. please run runSequenceUnique.use(gulp) first.`);
		use(gulp);
	}

	let disableResetTask = gulp.options.disableResetTask;

	gulp._resetAllTasks();

	gulp.options.disableResetTask = disableResetTask;

	return gulp;
}

export default init;

//console.log(use(Gulp));
