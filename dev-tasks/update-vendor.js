var exec = require('child_process').exec;

module.exports = function(grunt) {
  grunt.registerTask('updateVendor', 'Update vendor packages.', function() {
    var done = this.async();

    exec('./scripts/update-vendor.sh', function(err, stdout, stderr) {
      console.log(stdout);

      if (stderr) {
        console.log(stderr);
      }

      done();
    });
  });
};
