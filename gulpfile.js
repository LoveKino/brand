var gulp = require('gulp');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var del = require('del');
var Spawner = require('cl-spawner');

// please read general tasks
// if your my_dev_prev project path is not in root, change require's parameter.
var generalTask = require('./my_dev_prev/node/gulpfiles/libbabel/generalTask');

var spawner = Spawner();
// use this spawn instead of origin spawn
var spawn = (cmd, params) =>
    spawner.spawn(cmd, params, {
        stdio: 'inherit',
        cwd: __dirname
    });

generalTask({
    spawner,
    spawn,
    gulp,
    gulpBabel: babel,
    runSequence,
    del
});
