const fs = require('fs');
const process = require('process')

// Write a function, cat. It should take one argument, path, and it should read the file with that
// path, and print the contents of the file. Then, write some code that calls that function,
// allowing you to specify the path argument via the command line
function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}
// cat(process.argv[1]);
cat(process.argv[2]);