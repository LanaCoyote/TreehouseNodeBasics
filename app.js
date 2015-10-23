var profile = require( './profile.js' ); // profile module

// username that we'll get the information of
var usernames = process.argv.slice(2);

usernames.forEach( function( user ) {
  // retrieve the profile info
  profile.get( user );
} );