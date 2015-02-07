module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Mocha
    mocha: {
      all: {
        src: ['tests/testrunner.html'],
      },
      options: {
        run: true
      }
    },
    watch: {
      files: ['html/*.html', 'js/*.js', 'tests/**/*.js'],
      tasks: ['mocha'],
      options: {
        livereload: true
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.',
          livereload: true
        }
      }
    }
  });

  // Load grunt mocha task
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('default', ['mocha']);
  grunt.registerTask('server', "Serve your app", ['connect', 'watch' ]);

};
