Interactive-Spaces-Toolkit
==========================

Repository that holds tools created for prototyping and building interactive spaces.


Documentation
=============

I'm building the docs with JSDoc3
https://github.com/jsdoc3/jsdoc

jsdoc will generate output in jsdoc3/out

Some Docs for JSDoc3
http://usejsdoc.org/

JSDoc2 Ref (more complete): http://code.google.com/p/jsdoc-toolkit/w/list
JSDoc2 TagList: http://code.google.com/p/jsdoc-toolkit/wiki/TagReference

I made a really simple but handly Sublime build script to regenerate the docs 
and save them on the root level in a folder called "docs"
{
	"shell": true,
	"working_dir" : "/$project_path/jsdoc3",
	"cmd": ["./jsdoc -d ../docs ../VideoPlayer/Web/toolkit/ -r"]
}