var fs = require("fs");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
console.log("running liri");

//Functions
function myTweets(){
    console.log("running myTweets");
}

function spotifySong(song){
    console.log("running spotify",song);
}

function movie(title){
    console.log("running OMDB", title);
}

function doWhatItSays(){
    console.log("running doWhatItSays");
}



//todo: sanitize inputs
var input = process.argv[2]; //what we need to call
var option = process.argv[3]; //second set of input, if we need
//switch statement
switch (input) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong(option);
        break;

    case "movie-this":
        movie(option);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("I don't understand the command");

}
