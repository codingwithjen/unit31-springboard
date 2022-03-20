const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Add a feature, where, on the CL uou can optionally provide an argument to output to a file instead of
// printing to the console

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                // handle possible error
                console.error(err);
                // kill the process and tell the shell it errored
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        } else {
            console.log(data, out);
        }
    });
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        // kill the process and tell the shell it errored
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2]''
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path,out);
}

