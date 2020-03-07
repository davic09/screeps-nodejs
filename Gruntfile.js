module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Pull defaults (including username and password) from .screeps.json
    const config = require('./.screeps.json')

    // Allow grunt options to override default configuration
    const branch = grunt.option('branch') || config.branch || 'default';
    const email = grunt.option('email') || config.email || process.env.email;
    const token = process.env.SCREEPS_TOKEN;
    // var password = grunt.option('password') || config.password || process.env.password;
    const ptr = grunt.option('ptr') ? true : config.ptr
    const private_directory = grunt.option('private_directory') || config.private_directory;


    const currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Branch: ' + branch)

    // Load needed tasks
    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")
    grunt.loadNpmTasks("grunt-rsync")

    // path replace stuff

    grunt.registerTask('replace', 'Replaces file paths with _', function () {
        grunt.file.recurse('./dist', ReplaceImports);
    });

    // gObj = global grunt object
    let ReplaceImports = function (abspath, rootdir, subdir, filename) {
        const getReqd = require("./tools/getreqd");
        if (abspath.match(/.js$/) == null) {
            return;
        }
        let file = gObj.file.read(abspath);
        let updatedFile = '';

        let lines = file.split('\n');
        for (let line of lines) {
            if ((line).match(/[.]*\/\/ Compiler: IgnoreLine[.]*/)) {
                continue;
            }
            let reqStr = line.match(/(?:require\(")([^_a-zA-Z0-9]*)([^"]*)/);
            if (reqStr && reqStr != "") {

                let rePathed = getReqd.convertRequirePathToScreepsPath(abspath, reqStr, "src");
                line = line.replace(/require\("([\.\/]*)([^"]*)/, "require\(\"" + rePathed + "$2").replace(/\//gi, '_');
            }

            updatedFile += (line + '\n');
        }

        gObj.file.write((rootdir + '/' + (subdir ? subdir + '/' : '') + filename), updatedFile);
    }

    grunt.initConfig({

        // Push all files in the dist folder to screeps. What is in the dist folder
        // and gets sent will depend on the tasks used.
        screeps: {
            options: {
                email: email,
                token: token,
                // password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },


        // Copy all source files into the dist folder, flattening the folder
        // structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before
            // being send to the screeps server.
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g, '_');
                    }
                }],
            }
        },


        // Copy files to the folder the client uses to sink to the private server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
            options: {
                args: ["--verbose", "--checksum"],
                exclude: [".git*"],
                recursive: true
            },
            private: {
                options: {
                    src: './dist/',
                    dest: private_directory,
                }
            },
        },


        // Add version variable using current timestamp.
        file_append: {
            versioning: {
                files: [
                    {
                        append: "\nglobal.SCRIPT_VERSION = " + currentdate.getTime() + "\n",
                        input: 'dist/version.js',
                    }
                ]
            }
        },


        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },


        // Apply code styling
        jsbeautifier: {
            modify: {
                src: ["src/**/*.js"],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ["src/**/*.js"],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        }
    })

    // Combine the above into a default task
    grunt.registerTask('default', ['clean', 'copy:screeps', 'replace', 'file_append:versioning', 'screeps']);
    grunt.registerTask('private', ['clean', 'copy:screeps', 'replace', 'file_append:versioning', 'rsync:private']);
    grunt.registerTask('test', ['jsbeautifier:verify']);
    grunt.registerTask('pretty', ['jsbeautifier:modify']);
}