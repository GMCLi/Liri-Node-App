
console.log("....................................")

require("dotenv").config();
var keys = require("./keys");//Need key for bands in town
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var request = require("request");
var inquirer = require("inquirer");


var inputcom = process.argv[2];




//CONCERT THIS FIGURE OUT WHAT NEEDS TO BE DONE TO HAVE MORE THAN ONE WORD
//take user input [2] and [3]
//[2] will start the command
function concert() {
    var bandinput = "";

    for (var i = 3; i < process.argv.length; i++) {
        bandinput += process.argv[i] + "";
        // if ( i > 2 && i < process.argv.length) { //NEED HELP THIS SCREWS UP THE WHOLE THING
        //     bandinput = bandinput + "+" + process.argv[1];
        // }
    }
    console.log("Searched band: " + bandinput);

    console.log("-------------------------------------------------");

    var concertURL = "https://rest.bandsintown.com/artists/" + bandinput + "/events?app_id=codingbootcamp";

    axios.get(concertURL).then(
        function (response) {


            var artist = " ";

            for (var i = 0; i < response.data[0].lineup.length; i++) {
                artist += response.data[i].lineup + " ";
            }

            console.log("Artists: " + artist);

            console.log("-------------------------------------------------");

            var venue = response.data[0].venue.name;
            console.log("Venue name: " + venue);

            console.log("-------------------------------------------------");

            var vencity = response.data[i].venue.city;
            var venregion = response.data[i].venue.region;
            var vencountry = response.data[i].venue.country;
            console.log("Venue location: " + vencity + ", " + venregion + ", " + vencountry);

            console.log("-------------------------------------------------");


            var eventdate = moment(response.data[i].venue.datetime).add(24, 'hours').format('LLL');
            console.log("Date of event: " + eventdate);

            console.log("-------------------------------------------------");

            fs.appendFile("log.txt", "Concert This\n Searched band: " + bandinput + "\n Artists: " + artist + "\n Venue name: " + venue + "\n Venue location: " + vencity + ", " + venregion + ", " + vencountry + "\n Date of event: " + eventdate + "\n \n", function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Data Logged!");
                }
            });
        })
};
//[3] will be the band name in the search
//print out the NameDONE, Venue locationDONE, Date of Event


if (inputcom === "concert-this") {
    concert();

};







//SPOTIFY THIS SONG
//take user input [2] and [3]
//[2] will start the command
function spotify(song) {
    var songname = song || "";
    for (var i = 3; i < process.argv.length; i++) {
        //loop from 3 onwards will be the song name in the search        
        songname += process.argv[i] + " "
    }
    console.log("Searched song name: " + songname)


    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songname }).then(function (res) {

        console.log("-------------------------------------------------");

        var song = res.tracks.items[0].name;

        console.log("Song: " + song);//CONFIRMED OPERATIONAL

        console.log("-------------------------------------------------");

        var data = res.tracks.items[0].artists[0].name;

        console.log("Artist: " + data);//CONFIRMED OPERATIONAL

        console.log("-------------------------------------------------");

        var prelink = res.tracks.items[i].preview_url;

        console.log("Preview link: " + prelink);//CONFIRMED OPERATIONAL

        console.log("-------------------------------------------------");

        var album = res.tracks.items[0].album.name;

        console.log("Album name: " + album);//CONFIRMED OPERATIONAL
        console.log("-------------------------------------------------");


        fs.appendFile("log.txt", "Spotify This Song\n Searched song name: " + songname + "\n Song: " + song + "\n Artist: " + data + "\n Preview link: " + prelink + "\n Album name: " + album + "\n \n", function (err) {

            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Data Logged!");
            }

        });





    })
};
//print out ArtistDONE, Song nameDONE, preivew link of songDONE, album nameDONE

if (inputcom === "spotify-this-song") {
    spotify();
};




//MOVIE THIS
function movie() {
    var movieinput = "";
    for (var i = 3; i < process.argv.length; i++) {
        //loop from 3 onwards will be the song name in the search        
        movieinput += process.argv[i] + " "
    }
    if (process.argv.length > 2 && i < process.argv.length) {
        movieinput = movieinput + "+" + process.argv[i];//CONFIRMED OPERATIONAL
    }
    if (movieinput === "") {
        movieinput = "Mr. Nobody";
    }
    console.log("Searched movie: " + movieinput);

    var queryURL = "http://www.omdbapi.com/?t=" + movieinput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            console.log("-------------------------------------------------");
            var movtitle = response.data.Title;
            console.log("Movie Title: " + movtitle);

            console.log("-------------------------------------------------");

            var releasedate = response.data.Year;
            console.log("Year Released: " + releasedate);

            console.log("-------------------------------------------------");

            var IMDBrating = response.data.imdbRating;
            console.log("IMDB Rating: " + IMDBrating);

            console.log("-------------------------------------------------");

            var Rotrating = response.data.Ratings[1].Value;
            console.log("Rotten Tomatoes Rating: " + Rotrating);

            console.log("-------------------------------------------------");

            var country = response.data.Country;
            console.log("Country(s) of Production: " + country);

            console.log("-------------------------------------------------");

            var lang = response.data.Language;
            console.log("Language(s) of the Movie: " + lang);

            console.log("-------------------------------------------------");

            var plot = response.data.Plot;
            console.log("Plot: " + plot);

            console.log("-------------------------------------------------");

            var actors = response.data.Actors;
            console.log("Actors: " + actors);

            console.log("-------------------------------------------------");

            fs.appendFile("log.txt", "Movie This\n Searched movie: " + movieinput + "\n Movie Title: " + movtitle + "\n Year Released: " + releasedate + "\n IMDB Rating: " + IMDBrating + "\n Rotten Tomatoes Rating: " + Rotrating + "\n Country(s) of Production: " + country + "\n Language(s) of the Movie: " + lang + "\n Plot: " + plot + "\n Actors: " + actors + "\n \n", function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Data Logged!");
                }

            });
        }

    )
};
if (inputcom === "movie-this") {
    movie();





};

if (inputcom === "do-what-it-says") {
    console.log("anything");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");
        console.log(dataArr);

        if (dataArr[0] === "concert-this") {
            concert();
        }

        if (dataArr[0] === "spotify-this-song") {
            console.log(dataArr[1]);
            spotify(dataArr[1]);
        }

        if (dataArr[0] === "movie-this") {
            movie();
        }

    })






};



