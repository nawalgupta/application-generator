console.log('Welcome to Fullstack Application  Generator using Meteor, Nodes.js and Angular.js');
console.log('Developed by  Nawal - nawalkishore@gmail.com');

var spec = require('./app.json');
var config = require('./config.json');
var fse = require('fs-extra');
var u = require('./utility.js');
var recursive = require('recursive-readdir');

console.log(config);

var app = spec.app;
app.models = [];
var model;
var template_folder;
//createApp();
//installModules();

if (!config.output_folder){
	config.output_folder=app.name;	
}
//u.ensureFolder(app.name);
u.ensureFolder(config.output_folder);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
// Loading all the models files 
recursive('models', function (err, files) {
  //adding models
    console.log("Model Created" + files);
	
  files.forEach(addToModels);  
  console.log("Model Created");
  console.log("Model Created",app);
  
  
  // Start  Generating Main Files
  runAppTemplates(config.template_folder);	
  // Generating Model Files
  runAllModelsTemplates(config.template_folder);
  
  
  // Generate the files for custom templates and over write it if required
  // Start  Generating Main Files using Custom Templates
  //runAppTemplates(config.custom_template_folder);	
  // Generating Model Files  using Custom Templates
  //runAllModelsTemplates(config.custom_template_folder);
  
  
  // Finished
  console.log('!!Finished!! Enjoy!!');
  console.log('Now go to app folder and run metero ');
  console.log('$ cd ' + app.name);
  console.log('$ meteror');
  console.log('or ');
  
  console.log('/> cd ' + app.name);
  console.log('/> meteror');
  
  
});
//Loading models from json file. from /models directory
function addToModels(file){
	var model = JSON.parse(fse.readFileSync(file, 'utf8'));	
	console.log("Model Created" + model.name);
	u.enhance(model);
	app.models.push(model);	
}



// Creating Meteor App by running - meteor create app.name
// This commmand may not be successfull - Need to check - may be async 
function createApp(){
	console.log('createApp: ')
	u.createMetroApp(app.name);
}

// Installing meteor and node modules if missing
// This commmand may not be successfull - Need to check 


function runAppTemplates(folder){	
	//var template_folder=folder+"/app";
	var template_folder=folder;
	console.log('current template_folder: ' + template_folder);
	recursive(template_folder, function (err, files) {
		//files.forEach(generateAppFile);
		files = files || []; 
		for (var i = 0; i < files.length; i++) {
			console.log("runAppTemplates " + template_folder);
			var n = files[i].indexOf("_name");
			if (n<0){
				generateAppFile(files[i],template_folder);
			}			
		}
	});	
}

function generateAppFile(in_file, folder) {
	var locals =  { 'app': app	,'models':app.models, 'model':app.models[0]};
	var template_folder=folder;
	
	
	template_folder = template_folder.replace(/\//g, '\\');	
	console.log("generateAppFile " + template_folder);
			
	var out_file=in_file.replace(template_folder,"");
	out_file=out_file.replaceAll("app_name",app.name);
	u.runTemplate(in_file,locals,out_file,config.output_folder);     
	console.log('out file ' + out_file);
	console.log("generateAppFile + fol -  " + template_folder);
			
}

function runAllModelsTemplates(folder) {
	//var func=  processModel.bind (null, folder);​
	for (var i = 0; i < app.models.length; i++) {
		generateModel(app.models[i],folder);		
	}
}

function generateModel(model, folder) {
	locals =  { 'app': app	,'models':app.model, 'model':model};
	//template_folder=folder+"/model";
	template_folder=folder;
	console.log('current template_folder: ' + template_folder);
	recursive(template_folder, function (err, files) {
		files = files || []; 
		for (var i = 0; i < files.length; i++) {
			var n = files[i].indexOf("_name");
			if (n>=0){			
				generateModelFile(files[i],template_folder);
			}				
		}
	});
}

function generateModelFile(in_file, folder) {
	var model_name = locals.model.name;
	var models_name = locals.model.names;
	var app_name = locals.app.name;
	console.log(config.output_folder);

	var folder2 = folder.replace(/\//g, '\\');	
	var out_file=in_file.replace(folder2,"");
	
	out_file=out_file.replaceAll("model_name",model_name);
	
	out_file=out_file.replaceAll("models_name",models_name);
	
	out_file=out_file.replaceAll("app_name",app_name);
	
	u.runTemplate(in_file,locals,out_file,config.output_folder);     
	console.log('generated model' + out_file);
}
