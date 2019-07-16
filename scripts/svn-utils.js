const fs = require('fs-extra');
var svnUltimate = require('node-svn-ultimate');

class SvnUtils {
    constructor() {
        console.log("Smil folder renaming process started .");
    } 
    checkout(book, callback) {
        const path = `https://svn.inkling.com/svn/${book}/trunk/assets`;
        svnUltimate.commands.checkout(
            path, 
            `./habitat/${book}`,
            {
                username: "asish.khuntia@hmhco.com",
                password: "Ind@2018",
                depth: "immediates"
            },
            function( err ) {
                console.log( book + ": Checkout complete !" );
                if(err) {
                   callback(false);
                } else {
                    if (fs.existsSync(`./habitat/${book}/smil`)) {
                        svnUltimate.commands.checkout(
                            path + '/smil',
                            `./habitat/${book}/smil`,
                            {
                                username: "asish.khuntia@hmhco.com",
                                password: "Ind@2018",
                                depth: "infinity",
                                force: true
                            },
                            function( err ) {
                                if(err) {
                                    callback(false);
                                } else {
                                    callback(true);
                                }
                            } );
                    } else {
                        console.log('Smil folder Not Exist !');
                    }
                }
            } );
    }
    move(book) {
        if (fs.existsSync(`./habitat/${book}/smil`)) {
            svnUltimate.commands.move(
                `./habitat/${book}/smil`,
                `./habitat/${book}/smil_bak`,
                {
                    force: true
                },
                ( err ) => {
                    console.log("Moved !");
                    if(!err) {
                        svnUltimate.commands.commit(
                            `./habitat/${book}/`,
                            {
                                force: true,
                                params: [ '-m "HMHCLAS-1603: SMIL folder name changed to remove Page Audio functionality !"' ]
                            },
                            function( err ) {
                                console.log("Committed !");
                            }
                        );
                    } 
                }
            );
        } else {
            console.log('Smil folder Not Exist !');
        }
    }
}
module.exports = SvnUtils;