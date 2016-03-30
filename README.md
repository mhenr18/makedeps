# makedeps

JS script bundling/compiling tools have various ways to emit entry point
dependencies. Browserify has a simple `browserify --list` option, which outputs
a list of paths to files that the entry point depends on. Makedeps accepts that
on stdin, and writes out a Make-compatible dependency file to stdout.

At some point this might end up supporting Webpack as well. (Which is why this
exists to begin with, as the Browserify case could probably done using some sed
magic)

## Usage

    makedeps <target-name>

### Example

    $ browserify foo.js -o foo-bundled.js --list
    /path/to/bar.js
    /path/to/baz.js

    $ browserify foo.js -o foo-bundled.js --list | makedeps foo-bundles.js
    foo-bundled.js: /path/to/bar.js \
        /path/to/baz.js

You'll probably want to send this output to a file, so that you can include it
in your Makefile. An actual Makefile example is as follows:

    ENTRIES = src/foo.js src/bar/baz.js

    BROWSERIFY = node_modules/.bin/browserify
    BFLAGS = -t [ babelify --presets [ es2015 react ] ]

    all: $(addprefix build/dist/,$(ENTRIES))

    # browserify can't generate deps and output files at the same time, so we have to
    # do two separate bundles (one to actually bundle and one to get deps)
    build/dist/%.js: src/%.js
        @echo "bundle " $<
        @mkdir -p $(dir $@) build/deps/$(dir $*)
        @$(BROWSERIFY) $< -o $@ $(BFLAGS)
        @$(BROWSERIFY) $< -o $@ $(BFLAGS) --list | node makedeps.js $@ > build/deps/$*.js.d

    # include the generated deps so that changes to dependent files trigger rebuilds
    -include $(addsuffix .d,$(addprefix build/deps/,$(ENTRIES)))
