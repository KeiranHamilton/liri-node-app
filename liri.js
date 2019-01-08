require("dotenv").config();

//My variables that link to contained pages
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//variables to display user inputs.
var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);
//my commands for spotify, omdb, and bands
function UserInputs(userOption, inputParameter) {
  switch (userOption) {
    case "concert-this":
      showConcertInfo(inputParameter);
      break;
    case "spotify-this-song":
      showSongInfo(inputParameter);
      break;
    case "movie-this":
      showMovieInfo(inputParameter);
      break;
    case "do-what-it-says":
      showSomeInfo();
      break;
    default:
      console.log(
        "Invalid, Please type in one of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"
      );
  }
}

//Funtion for Music Info: Spotify
function showSongInfo(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "The Sign"; //default Song
  }
  spotify.search(
    {
      type: "track",
      query: inputParameter
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log("**********SONG INFO*********");
        fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync(
          "log.txt",
          "preview song: " + songs[i].preview_url + "\n"
        );
        console.log("Album: " + songs[i].album.name);
        fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
        console.log("Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync(
          "log.txt",
          "artist(s): " + songs[i].artists[0].name + "\n"
        );
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************\n");
      }
    }
  );
}
