/**
 * Created by user on 2017/11/1/001.
 */

import * as runSequenceCore from 'run-sequence';
import * as runSequenceUnique from '.';

export const runSequence = use();
runSequence.use = use;
runSequence.run = run;

export default runSequence;

export function run(gulp = undefined, ...tasks)
{
	return use(gulp)(...tasks);
}

export function use(gulp = undefined, options?: runSequenceUnique.IOptions)
{
	if(gulp === undefined)
	{
		gulp = require('gulp');
	}

	return runSequenceCore.use(runSequenceUnique.use(gulp, options));
}

{
	// @ts-ignore
	Object.defineProperty(exports, "options", {
		get: function ()
		{
			return runSequenceCore.options;
		},
		set: function (newValue)
		{
			runSequenceCore.options = newValue;
		},
	});

	Object.defineProperty(runSequence, "options", {
		get: function ()
		{
			return runSequenceCore.options;
		},
		set: function (newValue)
		{
			runSequenceCore.options = newValue;
		},
	});
}
