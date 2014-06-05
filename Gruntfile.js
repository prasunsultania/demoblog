module.exports = function(grunt) {
  
	// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{src: 'public/js/app.js', dest: 'public/js/app.min.js', cwd: process.cwd()},
                {src: 'public/js/controllers.js', dest: 'public/js/controllers.min.js', cwd: process.cwd()}]
      }
    },
    cssmin: {    	
		options: {
	      banner: '/* My minified css file */'
	    },
	    minify:{
	    	files: [{src: 'public/css/app.css', dest: 'public/css/app.min.css', cwd: process.cwd()}]
	    }
    }    	
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};