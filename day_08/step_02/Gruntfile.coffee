module.exports = (grunt) =>

  require('load-grunt-tasks')(grunt)
  
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json'),
    jshint:
      options:
        asi: true,
      gruntfile: ['Gruntfile.js'],
      source: ['src/**/*.js']
    csslint:
      source: ['src/**/*.css']
    watch:
      gruntfile:
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      source:
        files: 'src/**/*.js',
        tasks: ['jshint:source']
      source_css:
        files: 'src/**/*.css',
        tasks: ['csslint:source']
    concat:
      options:
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n",
      dist_js:
        src: ['src/**/*.js', '.tmp/template.js'],
        dest: 'dist/app.js'
      dist_css:
        src: ['src/**/*.css'],
        dest: 'dist/app.css'
    uglify:
      options:
        sourceMap: true
      dist_js:
        files:
          'dist/app.min.js': ['dist/app.annotated.js']
    ngAnnotate:
      options:
        singleQuotes: true,
      dist:
        files: [
            expand: true,
            src: ['dist/app.js'],
            ext: '.annotated.js',
            extDot: 'last'
        ]
    clean:
      dist:
        src: ["dist/", '.tmp/']
    copy:
      main:
        src: 'src/index.html',
        dest: 'dist/index.html'
    ngtemplates:
      options:
        htmlmin:
          collapseWhitespace: true,
          collapseBooleanAttributes: true
      chatApplication:
        src: 'src/modules/**/*.html',
        dest: '.tmp/templates.js'
  )


  grunt.registerTask('build', [
    'clean',
    'jshint',
    //'csslint',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy'
  ])

  grunt.registerTask('default', ['watch'])

}