/**
 * Created by user on 2017/11/1/001.
 */

import * as gulp from 'gulp';
import runSequence from '../run-sequence';

gulp.task('task-name', function ()
{
	console.log('[task]', this);
	return;
});

let callback = function (...ret)
{
	console.log('[callback]', this, ret);
};

runSequence.use(gulp);
runSequence('task-name', callback);
