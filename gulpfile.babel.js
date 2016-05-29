//Automatization Power!!
//Based on the tutorial on https://youtu.be/cFrkpcLFwcw

//Automatization module
import gulp from 'gulp';

//Allows to make shell calls from gulp
import shell from 'gulp-shell';

//Allows to easly delete folders
import rimraf from 'rimraf';

//Allows to run gulp tasks on a sequence given by an array
import run from 'run-sequence';

//Allows to set gulp watchers that see changes on files and set tasks
//automatically(like building like translaping)
import watch from 'gulp-watch';

//Creates a gulp server
import server from 'gulp-live-server'

//Allows to join js modules into a single file
import webpack from 'gulp-webpack'

//Allows to delete folders and files. used in replacement of rimraf
//that was causing a some problems
import del from 'del'

//Important paths that wit will be used
const paths = {
  //Points to the pre-compiled es2015 server js files that will be translaped
  serversrcjs: ['./src/server/server.js'],
  //Points where the translapped server file will be hosted
  destination: './server',
  //Points to the the pre-translaped es2015 js files of the React
  //app are hosted
  appsrcjs: './src/app/**/*.js',
  //Poitns to the file that contains the app bundle parts to be translapped
  appMainJsSrc: './src/app/main.js',
  //Points to the folder where the translapped files will be hosted
  appDest: './public/js'
}

//Task that will be run when we command gulp on the terminal
gulp.task('default', cb => {
  process.stdout.write('Gulp! Gulp! \n')
  //Creates a sequence of tasks that are to be called. One after the other
  run('server', 'build', 'watch', cb);
});

//Sets up the server container. gulp-live-server is an instance of express
let express;
gulp.task('server', () => {
  //Creates the server. It doesn't start it.
  //The server is created from the instructions on ./server/server.js
  express = server.new(paths.destination + "/server.js");
});

//Building phase in which first, we erase all files from the destination
//folder, then we translape the files from src/server written in es2015 into
//es5 js in the server folder. Then, calls webpack to bundle all the
//app modules into a single file and restarts the server
gulp.task('build', cb => {
  //Secuenof tasks
  run('clean', 'babel', 'webpack', 'restart', cb);
});

gulp.task('buildOnly', cb => {
  //Secuenof tasks
  run('clean', 'babel', 'webpack', cb);
});

gulp.task('clean', cb => {
  //rimraf erases all files on the destination folder.
  //the destination contains the transpiled files
  //rimraf(paths.destination, cb);
  return del([
    paths.destination
  ]);
  if(cb) cb();
});

//not used right now. Is a module created by facebook to give
//more control on types in js
gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

//Transpiler! From es2015 and react code into es5
//Shell allows us to send commands to the terminal
//In this case, we are ordering to transpile all files on the src/server folder
//into the server folder
gulp.task('babel', shell.task([
  'babel src/server --out-dir server'
]));

//bundler!! Allows us to join different modules into a single file
//that contains require or import functions. Used to build the app.
//main.js contains all the requires of the different modules
//index.js is the file than the html will call when it calls our script!
gulp.task('webpack', () => {
  process.stdout.write('watch mee app app \n')
  //We create a stream where main.js is the entry point
  return gulp.src(paths.appMainJsSrc)
          //we pipe that stream into webpack that will do the piping
          .pipe(webpack({
            output: {
              //final output. The folder is given below
              filename: "index.js"
            },
            module: {
              //Before the translaping we pass throw babel the files
              loaders: [
          			{
          				test: /\.js$/,
          				exclude: /node_modules/,
          				loader: 'babel',
          				query: {
          					presets: ['es2015', 'react']
          				}
          			}
          		]
          	}
          }))
          //destination folder
          .pipe(gulp.dest('./public/js/'));
});

//Once builded the new folder and the new app files, we restart the server
gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task("justwatching", () => {
  process.stdout.write('I am watching you! \n')
});

gulp.task('watchServer', () => {
  gulp.watch(paths.serversrcjs , (cb) => run('clean', 'babel', 'restart'));
});

gulp.task('watchApp', () => {
  gulp.watch(paths.appsrcjs, (cb) => run('webpack'));
});

//We set a watcher that we watch to changes into the paths.srcjs files.
//If there are, it calls the build task
gulp.task('watch', ['watchApp', 'watchServer']);
