console.log('Welcome to Fullstack Application  Generator using Meteor, Nodes.js and Angular.js');
console.log('Developed by  Nawal - nawalkishore@gmail.com');

var spec = require('./app.json');
var config = require('./templatize_config.json');

var fse = require('fs-extra');
var fs = require('fs');
var path = require('path');
var u = require('./utility.js');
var recursive = require('recursive-readdir');

console.log(config);

var app = spec.app;
app.models = [];
var model;
var template_folder;
u.ensureFolder(app.name);
//createApp();
//installModules();

//return;

function ensureFolder(fileName){
	dir = path.dirname(fileName);
	fse.ensureDirSync(dir,cb);
	
}

//meteor npm install --save angular-simple-logger angular-google-maps
//meteor add tmeasday:publish-counts
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

  
  
  // Start  Generating Main Files
generateTemplates(config.source,config.destination);	

function generateTemplates(source,dest){	
	var in_folder=source;
	var out_folder=dest;
	console.log('current template_folder: ' + in_folder);
	recursive(in_folder, function (err, files) {
		//files.forEach(generateAppFile);
		files = files || []; 
		for (var i = 0; i < files.length; i++) {
			console.log("runAppTemplates " + in_folder);
			generateAppFile(files[i],in_folder,out_folder);		
		}
	});	
}

function generateAppFile(in_file,in_folder, out_folder) {
	var locals =  { 'app': app	,'models':app.model};
	var template_folder=in_folder;
	var out_folder=out_folder;
	
	template_folder = template_folder.replace(/\//g, '\\');
	out_folder = out_folder.replace(/\//g, '\\');	
	console.log("generateAppFile " + template_folder);
			
	var out_file=in_file.replace(template_folder,"");
	
	for (var i = 0; i < config.file_conversion.length; i++) {
		options=config.file_conversion[i];
		out_file=out_file.replaceAll(options.from,options.to);
	}	
	runTemplate(in_file,config.content_conversion,out_file,out_folder);     
}

function runTemplate(templateName,content_conversion,outputFileName,out_folder){
	var output = fs.readFileSync(templateName, "utf8");
	for (var i = 0; i < content_conversion.length; i++) {
		options=content_conversion[i];
		output=output.replaceAll(options.from,options.to);
	}
	
	var fullFileName= "" + out_folder+ ""+ outputFileName;
	console.log('out- ' + fullFileName);
	ensureFolder(fullFileName,cb);
	fs.writeFile(fullFileName, output, 'utf8', fsCallback);	
	console.log('File Create-' + fullFileName);
}
function fsCallback(err,ff){
	if (err){
		console.log('File Create Error ' + err);
	}
}

function cb(err) {
  //console.log(err)  
}