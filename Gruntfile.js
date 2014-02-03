module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: [{
					expand: true,
					src: '*.js',
					dest: 'build/js/',
					cwd: 'src/js',
					ext: '.min.js'
				}]
			}
		},
		jshint: {
			all: {
				src: 'src/js/*.js'
			}
		},
		stylus: {
			compile: {
				files: [{
					expand: true, 
					cwd: 'src/css',
					src: ['*.styl'],
					dest: 'build/css/',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			build: {
				files: [{
					expand: true, 
					cwd: 'build/css',
					src: ['*.css'],
					dest: 'build/css/',
					ext: '.min.css'
				}]
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					ui: 'bdd',
					growl: true,
					recursive: true
				},
				src: ['./test/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-newer');

	// Stylesheets Tasks
	grunt.registerTask('stylesheets', ['stylus', 'cssmin']);

	// JS Lint
	grunt.registerTask('lint', ['newer:jshint:all']);

	// Minify JS
	grunt.registerTask('minify', ['newer:uglify']);

	// Scripts Tasks
	grunt.registerTask('js', ['lint', 'minify']);

	// Test
	grunt.registerTask('test', ['mochaTest']);

	// Default task(s).
	grunt.registerTask('default', ['js', 'stylesheets']);
}