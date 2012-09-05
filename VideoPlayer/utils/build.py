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
'LT.js',
'BaseVideo/controller.js',
'BaseVideo/model.js',
'BaseVideo/view.js'
]

YT_FILES = [
'YouTubeVideo/controller.js',
'YouTubeVideo/model.js',
'YouTubeVideo/view.js'
]

def merge(files):

	buffer = []

	for filename in files:
		with open(os.path.join('../src', '', filename), 'r') as f:
			buffer.append(f.read())

	joined = "".join(buffer)

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

	return ("// %s - https://github.com/labatrockwell/Interactive-Spaces-Toolkit\n" % endFilename) + text


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

def parse_args():

	if ap:
		parser = argparse.ArgumentParser(description='Build and compress Three.js')
		parser.add_argument('--common', help='Build VideoPlayer basic files', action='store_const', const=True)
		parser.add_argument('--yt', help='Build YT Player utils', action='store_const', const=True)
		parser.add_argument('--version', help='Name of version', default='r1')
		parser.add_argument('--all', help='Build all VideoPlayer files', action='store_true')

		args = parser.parse_args()

	else:
		parser = optparse.OptionParser(description='Build and compress LAB Framework')
		parser.add_option('--common', dest='common', help='Build VideoPlayer basic files', action='store_const', const=True)
		parser.add_option('--yt', dest='three', help='Build YT Player utils', action='store_const', const=True)
		parser.add_option('--version', dest='version', help='Name of version',default='r1')
		parser.add_option('--all', dest='all', help='Build all VideoPlayer files', action='store_true')

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
	['lab_vidplayer', 'includes', '', COMMON_FILES, args.common],
	['lab_vidplayer_yt', 'includes_yt', 'externs_extras', YT_FILES, args.three]
	]

	for fname_lib, fname_inc, fname_externs, files, enabled in config:
		if enabled or args.all:
			buildLib(files, fname_lib, fname_externs, version)

if __name__ == "__main__":
	main()

