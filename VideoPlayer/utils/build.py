#!/usr/bin/env python

try:
	import argparse
	ap = 1
except ImportError:
	import optparse
	ap = 0

import os
import tempfile
import sys
import re

COMMON_FILES = [
'LabBase.js',
'Utils.js',
'EventDispatcher.js',
'TouchGestureHandler.js',
'agents/Agent.js',
'agents/Behavior.js',
'agents/Group.js',
'app/BaseApp.js',
'geom/Point.js',
'geom/Rect.js',
'sound/AudioContext.js',
'sound/Player.js',
'sound/WAPlayer.js',
'utils/DOMElement.js',
'utils/WebSocket.js'
]

THREE_FILES = [
'app/ThreeApp.js',
'three/Camera.js',
'three/Geometry.js',
'three/Mesh.js',
'three/MouseHandler3D.js',
'three/Object.js',
'three/ParticleEmitter.js',
'three/Ray.js',
'three/Shader.js',
'three/TouchHandler3D.js'
]

def merge(files):

	buffer = []

	for filename in files:
		with open(os.path.join('../src', 'lab', filename), 'r') as f:
			buffer.append(f.read())

	joined = "".join(buffer)
	#remove LAB.require (but not the function LAB.require)
	joined = re.sub(r"LAB.require\(.*\);","",joined)

	return joined


def output(text, filename):

	with open(os.path.join('..', 'build', filename), 'w') as f:
		f.write(text)


def compress(text, fname_externs):

	externs = ""
	if fname_externs:
		externs = "--externs %s.js" % fname_externs

	in_tuple = tempfile.mkstemp()
	with os.fdopen(in_tuple[0], 'w') as handle:
		handle.write(text)

	out_tuple = tempfile.mkstemp()

	os.system("java -jar compiler/compiler.jar --warning_level=VERBOSE --jscomp_off=internetExplorerChecks --jscomp_off=globalThis --jscomp_off=checkTypes --language_in=ECMASCRIPT5 --externs externs_common.js %s --js %s --js_output_file %s" % (externs, in_tuple[1], out_tuple[1]))

	with os.fdopen(out_tuple[0], 'r') as handle:
		compressed = handle.read()

	os.unlink(in_tuple[1])
	os.unlink(out_tuple[1])

	return compressed


def addHeader(text, endFilename):

	return ("// %s - http://github.com/labatrockwell/LAB_JS_Framework\n" % endFilename) + text


def makeDebug(text):
	position = 0
	while True:
		position = text.find("/* DEBUG", position)
		if position == -1:
			break
		text = text[0:position] + text[position+8:]
		position = text.find("*/", position)
		text = text[0:position] + text[position+2:]
	return text


def buildLib(files, filename, fname_externs, version):

	text = merge(files)

	folder = ''

	filename = filename + '-' + version + '.js'

	print "=" * 40
	print "Compiling", filename
	print "=" * 40
	text = compress(text, fname_externs)

	output(addHeader(text, filename), folder + filename)


def buildIncludes(files, filename):

	template = '\t\t<script src="../src/lab/%s"></script>'
	text = "\n".join(template % f for f in files)

	output(text, filename + '.js')


def parse_args():

	if ap:
		parser = argparse.ArgumentParser(description='Build and compress Three.js')
		parser.add_argument('--common', help='Build LAB Framework', action='store_const', const=True)
		parser.add_argument('--three', help='Build LAB THREE utils', action='store_const', const=True)
		parser.add_argument('--version', help='Name of version', default='r1')
		parser.add_argument('--all', help='Build all LAB JS files', action='store_true')

		args = parser.parse_args()

	else:
		parser = optparse.OptionParser(description='Build and compress LAB Framework')
		parser.add_option('--common', dest='common', help='Build LAB Framework', action='store_const', const=True)
		parser.add_option('--three', dest='three', help='Build LAB THREE utils', action='store_const', const=True)
		parser.add_option('--version', dest='version', help='Name of version',default='r1')
		parser.add_option('--all', dest='all', help='Build all Three.js versions', action='store_true')

		args, remainder = parser.parse_args()

	# If no arguments have been passed, show the help message and exit
	if len(sys.argv) == 1:
		parser.print_help()
		sys.exit(1)

	return args


def main(argv=None):

	args = parse_args()

	version = args.version

	config = [
	['labjs', 'includes', '', COMMON_FILES, args.common],
	['labjs_three', 'includes_three', 'externs_extras', THREE_FILES, args.three]
	#['labjs_tdl', 'includes_dom', 'externs_extras', TDL_FILES, args.tdl]
	]

	for fname_lib, fname_inc, fname_externs, files, enabled in config:
		if enabled or args.all:
			buildLib(files, fname_lib, fname_externs, version)
			#buildIncludes(files, fname_inc)

if __name__ == "__main__":
	main()

