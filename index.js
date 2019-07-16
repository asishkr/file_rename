const fs = require('fs-extra');
const Habitat = require('./constant.js');
const SvnUtils = require('./scripts/svn-utils.js');
const Process = require('./scripts/process.js');

fs.remove(`./habitat`);

const svn = new SvnUtils();

let promise = [];
Habitat.forEach((book) => {
    promise.push(new Promise((resove, reject) => {
        svn.checkout(book, (data)=> {
            if(data) {
                resove(book);
            } else {
                reject();
            }
        });
    }).then((book) => {
        //Process(`./habitat/${book}`);
    })
    .then(() => {
        svn.move(book);
    })
    .catch((err) => {
        console.log("Err !", err);
    }));
});
Promise.all(promise)
    .catch((err) => {
        console.log("Err !", err);
    });