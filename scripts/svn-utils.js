var svnUltimate = require('node-svn-ultimate');
class SvnUtils {
    constructor() {
        console.log("SvnUtils ..");
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
                }
            } );
    }
    move(book) {
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
                            params: [ '-m "Commit comment"' ]
                        },
                        function( err ) {
                            console.log("Committed !");
                        }
                    );
                } 
            }
        );
    }
}
module.exports = SvnUtils;