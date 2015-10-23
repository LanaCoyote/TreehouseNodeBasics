var https = require( 'https' ); // https module (otherwise we get a redirect)
var http  = require( 'http' );  // http module

// printUserScore
// Prints a message to the console with the given badgeCount and points
function printUserScore( name, badgeCount, points ) {
  console.log( name + " has " + badgeCount + " total badges and " + points + " points in JavaScript" );
}

// printError
// Prints out an error message for us
function printError( e ) {
  console.log( e.message );
}

function get( username ) {
  // connect to treehouse api (http://teamtreehouse.com/username.json)
  var req = https.get( "https://teamtreehouse.com/" + username + ".json",
    function( res ) {
      var body = "";
      
      // read the data out
      res.on( "data", function( chunk ) {
        body += chunk;
      } );
      
      res.on( "end", function() {
        if ( res.statusCode === 200 ) {
          // parse the data for badges and points
          try {
            var data = JSON.parse( body );
            
            // print the data back to the console
            printUserScore( data.name, data.badges.length, data.points.JavaScript );
          } catch ( e ) {
            // error occurred during parse
            printError( e );
          }
        } else {
          // non-200 status code received
          printError( { message: "Non-200 status code received when retrieving data for " + username + ": " + http.STATUS_CODES[ res.statusCode ] } );
        }
      } );
    } );
  
  // handle any errors in our connection
  req.on( "error", printError );
}

// handle module stuff here
module.exports.get = get;