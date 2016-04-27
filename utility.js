var fs = require('fs');
var swig = require('swig');
var path = require('path');
var fse = require('fs-extra');

var exec = require('child_process').exec;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ensureFolder(fileName){
	dir = path.dirname(fileName);
	fse.ensureDirSync(dir,cb);
	
}
/*
function createMetroApp(name){
	//some issue with command
	var cmd = 'meteor create ' + name;
	console.log(cmd)
	exec(cmd, function(error, stdout, stderr) {
	  // command output is in stdout
	  //console.log(error);
	});	
}
*/
//
function goToMeteorDir(dir){
	try {
		process.chdir('./' + dir);
		console.log('Changed to meteor directory: ' + process.cwd());
	}
	catch (err) {
		console.log('Error  ' + err);
	}	
}

function comeBack(){
	try {
	process.chdir('..');
	console.log('Changed to Main Directory ' + process.cwd());
	}
	catch (err) {
		console.log('Changed to Main Directory' + err);
	}	
}
//todo run npm_commands

function ensureNodeModules(modules){
	//npm install -g swig --save
	//npm install swig --save
	try {
	
	
	}
	catch (err) {
		console.log('Error in node modules' + err);
	}	
}


//todo run npm_commands
function runMeteorCommand(commands){	
	try {
	
		for (var i = 0; i < commands.length; i++) {
			var cmd = 'meteor ' + commands[i];
			console.log(cmd)
			exec(cmd, function(error, stdout, stderr) {
					// command output is in stdout
					//console.log(error);
			})

		}
			
	}
	catch (err) {
		console.log('Error in run metero commands' + err);
	}	
}

function fsCallback(err,ff){
	if (err){
		console.log('File Create Error ' + err);
	}
}

function cb(err) {
  //console.log(err)  
}
function enhanceField(field){
	// create missing attrutes
	if (!field.Name){
		field.Name=capitalizeFirstLetter(field.name);
	}
	if (!field.names){
		
		field.names= field.name+ "s";
	}
	// TODO add field type
}
function enhance(model){
	// create missing attrutes
	if (!model.Name){
		model.Name=capitalizeFirstLetter(model.name);
	}
	if (!model.names){
		//todo use pluralize module
		model.names= model.name+ "s";
	}
	if (!model.Names){
		model.Name=capitalizeFirstLetter(model.name);
	}
	
	// enhange fields
	if (model.fields){
		model.fields.forEach(enhanceField);
	}
}
function runTemplate(templateName,options,outputFileName,outputFolder){
	swig.setDefaults({
	   varControls: ['[[', ']]'] 
	});
	console.log('input file-' + templateName);
	var template = fs.readFileSync(templateName, "utf8");
	var out = swig.render(template, {locals:options}  );
	var fullFileName= "" + outputFolder+ ""+ outputFileName;
	console.log('output file- ' + fullFileName);
	ensureFolder(fullFileName,cb);
	fs.writeFile(fullFileName, out, 'utf8', fsCallback);
	
}
/*
function installModules(app,config){
	
	//may not be required
	//npm install from package.json should be sufficient
	ensureNodeModules(config.npm_modules);
	
	dir = "./" + app.name +"/"
	fse.ensureDirSync(dir,u.cb);
	// cd appFolder
	goToMeteorDir(app.name) //go to meteor directory
	// install meteror packages
	// remove meteror packages
	runMeteorCommand(config.meteor_commands); // 
	
	comeBack(); // change back current dir to parent
	//confirm 
	console.log('current directory is now: ' + process.cwd());
}
*/
module.exports = {
	// createMeteorApp:createMeteorApp,
	goToMeteorDir:goToMeteorDir,
	comeBack:comeBack,
	ensureNodeModules:ensureNodeModules,
	runMeteorCommand:runMeteorCommand,
	runTemplate:runTemplate,
	cb:cb,
	ensureFolder:ensureFolder,
	enhance:enhance
	
}