/**
 * Created by user on 2017/11/1/001.
 */

import * as runSequence from 'run-sequence';
import * as runSequenceUnique from '.';

export default use();

export function run(gulp = undefined, ...tasks)
{
	return use(gulp)(...tasks);
}

export function use(gulp = undefined)
{
	if(gulp === undefined)
	{
		gulp = require('gulp');
	}

	return runSequence.use(runSequenceUnique.use(gulp));
}

{
	// @ts-ignore
	Object.defineProperty(exports, "options", {
		get: function ()
		{
			return runSequence.options;
		},
		set: function (newValue)
		{
			runSequence.options = newValue;
		},
	});
}
