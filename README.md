# Full Stack Application Generator
### meteor react native angular application and many more frameworks.


##It has basically two projects:

1. Generate Full stack application. Your choice of stack/technologies.
2. Convert any existing project to template (Boilerplate)

###Why this project
I am overwhelmed with the flood of javascript frameworks. Picking up the write technology seems to be impossible. ES6 features require new learning curve. Choose from AngularJs, Meteor, React, ReactNative, Go, Dart, Ionic, NativeJS, Meteor, Express, Hapi, Sail. More options leads to no options. 

###Just tell (using config) what you want - models, realations and features.
Code can be auto generatoer in the language and technology of your choice. Feature complete. If you picked up the wrong stack, spend another few minutes and generate the code again using a different stack. Most of the unit tests can be also generated. No more wrting, no more rewriting. I know auto generator code was never too usefull, but this time you are in charge what will be generated - complete control. 


This project is inspired from some other project.
1. Net T4 Templates
2. meteor-kitchen.com
3. Various other code generators, RAD tools and compilers

## Setup
1. clone this project
2. install npm dependency - npm install.
3. install any missing npm package

## Steps to generate a project.
1. modify sample app.json
2. modify sample models/<model>.json
3. modify the config.js to choose the template - fullstack engine. 
4. $ node create.js - (no parameters. pararmeters are in config files)


#### Work in progress templates
I am working on creating more fullstack templates. Following generators are planned
1. Metero with Angular or React
1. DotNet WebAPI with  Angular or React
2. Mean Stack with Express or Hapi or Sail
3. Django with Angular or React
4. NativeScript/IonicFramework


# Incomplete/Planned features.
1. Automatic parsing the project and inserting the for loop for models and fields using babel,js.
2. Adding more control on generated code
3. Pick features
4. Generate DB/Schema from models for RDBMS
5. Add relations option to fields
3. Many more!! suggestion welcome


## Template Generator
Steps to generate the templates from any existing application.
 * modify the templatize_config.json
 * $ node create.js - (no parameters. pararmeters are in templatize_config.json file)
 * Manually add the  {{ for model in app.models}} {{ endfor }}. for mutiple models code.
 * Manually add the  {{ for field in model.field}} {{ endfor }}. for field looping code.


### Advantage
 * Easily modifyable to add new feature.
 * One Spec (Model) many solution
 * Open Source 
 * Super fast code generation.
 
### What to expect
 * bugs.
 * missing features
 * this is just a wip - alpha version


Props to creater of meteor-kitchen, from which
the inspiration to this, and some handy implementation hints, came.

### Stuff/inspiration used to make this:

 * [meteor-angular]  Project is used to for sample template
 * [meteor-kitchen] I was looking for angular template in meteor-kitchen
 * [swig.js] For Generating code using Template Code

