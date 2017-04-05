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

                console.log("Tweet " + i + ": " + tweets[i].text);
                console.log();
                fs.appendFile("log.txt", "\n" + tweets[i].text, function(error) {
                    if (error) {
                        console.log(error);
                    }
                });

            }
        }
    });
    //grab results (loop)
    //make results pretty
    //display results
}

function spotifySong(song) {
    //var song = JSON.parse(song);
    //setup client and make request
    if (song === undefined) {
        song = "The Sign";
    }

    spotify.search({
        type: 'track',
        query: song
    }, function(err, song) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log("Artist: " + song.tracks.items[0].artists[0].name);
        console.log("Song: " + option);
        console.log("Album that " + option + " is on: " + song.tracks.items[0].album.name);
        console.log("Preview of " + option + ": " + song.tracks.items[0].preview_url);
        fs.appendFile("log.txt", "\n" + option, function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
    //console log object
    //loop through object for:
    //artist(s)
    //song name
    //preview link of the song from spotify
    //the album that the song is in
}

function movie(title) {
    if (title === undefined) {
        title = "Mr. Nobody";
    }
    //setup query string for OMDB API call (option)
    request("http://www.omdbapi.com/?t=" + title + "&tomatoes=true", function(error, response, body) {
        var body = JSON.parse(body);

        if ('statusCode:', response && response.statusCode) {
            console.log("Movie Title: " + body.Title);
            console.log("Year this movie came out: " + body.Year);
            console.log("Rating on IMDB: " + body.imdbRating);
            console.log("Countries: " + body.Country);
            console.log("Original language of the film: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Main actors: " + body.Actors);
            console.log("Rotten Tomato Rating: " + body.Ratings[1].Value);
            console.log("Link to Rotten Tomatoes: " + body.tomatoURL);
            fs.appendFile("log.txt", "\n" + body.Title, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        } else {
            console.log('error:', error);
        }

    });
}

function doWhatItSays() {
    //read txt file (fs) and save that to variable
    //grab the command, grab the second input if there is one
    //switch based on the command (3 cases)
    fs.readFile("random.txt", "utf8", function(err, info) {


        data = info.split(",");
        input = data[0];
        option = data[1];
        switch (input) {
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this-song":
                spotifySong(option);
                break;
            case "movie-this":
                movie(option);

        }
        fs.appendFile("log.txt", "\n" + option, function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
}



//todo: sanitize inputs
var cleaner = process.argv.slice(2);
var input = cleaner[0]; //what we need to call
var option = cleaner.slice(1).join(" "); //second set of input, if we need

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
