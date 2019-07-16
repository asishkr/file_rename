const fs = require('fs');

var walk = function(dir) {
    console.log("here in walker");
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            if(!/\/\.svn\//.test(file)) {
                results = results.concat(walk(file));
            }
        } else { 
            /* Is a file */
            if(/\.xhtml\.smil$/.test(file)) {
                fs.rename(file, file+'_bak_HMHCLAS-1603', (err) => {
                  if (err) throw err;
                });
            }
            results.push(file);
        }
    });
    return results;
}

module.exports = walk;