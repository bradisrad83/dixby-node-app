var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

//Functions
function myTweets() {
    //initiallze new twitter client (keys)
    //var client = keys.twitterKeys;
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    //console.log(client);
    //setup paramaters
    var params = {
        screen_name: "laravelphp"
    };
    //make request (client.get)
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                console.log(tweets[i].text);
                console.log("______________________________________________________________________________________________");
            }
        }
    });
    //grab results (loop)
    //make results pretty
    //display results
}

function spotifySong(song) {
    //setup client and make request
    spotify.search({
        type: 'track',
        query: song
    }, function(err, song) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(song);
    });
    //console log object
    //loop through object for:
    //artist(s)
    //song name
    //preview link of the song from spotify
    //the album that the song is in
}

function movie(title) {
    //setup query string for OMDB API call (option)
    request("http://www.omdbapi.com/?t=" + title + "&tomatoes=true", function(error, response, body) {
        var body = JSON.parse(body);
        if ('statusCode:', response && response.statusCode) {
            console.log(body.Title);
            console.log(body.Year);
            console.log(body.imdbRating);
            console.log(body.Country);
            console.log(body.Language);
            console.log(body.Plot);
            console.log(body.Actors);
            console.log(body.tomatoRating);
            console.log(body.tomatoURL);
        } else {
            console.log('error:', error);
        }

    });;
    //http://www.omdbapi.com/?t=matrix&tomatoes=true
    //grab results
    //pretty results
    //display resutls
    //* Title of the movie.
    //* Year the movie came out.
    //* IMDB Rating of the movie.
    //* Country where the movie was produced.
    //* Language of the movie.
    //* Plot of the movie.
    //* Actors in the movie.
    //* Rotten Tomatoes Rating.
    //* Rotten Tomatoes URL.
}

function doWhatItSays() {
    //read txt file (fs) and save that to variable
    //grab the command, grab the second input if there is one
    //switch based on the command (3 cases)
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
