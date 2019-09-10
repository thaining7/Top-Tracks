
$(document).ready(function () {
  // Country Object Above


  var client_id = '475cfa7b9c8740bdab335681de129825'; // Your client id
  var client_secret = '498f1817fa8448bdbc09ddec03f2522f'; // Your secret
  var token;

  $.ajax(
    {
      method: "POST",
      //url: "https://accounts.spotify.com/api/token",
      url: "https://chriscastle.com/proxy/spotify.php",
      //dataType: "json",
      crossDomain: true,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      data: {
        // "grant_type":    "authorization_code",
        //  "code":          code,
        "redirect_uri": "https://chriscastle.com/proxy/spotify.php",
        "client_secret": client_secret,
        "client_id": client_id,
      },
      success: function (result) {
        //console.log(result)
        token = result.access_token;

      },
    }
  );


  //  function, takes in string, if string is similar to COUNTRY NAME IN OBJ, return playist ID of that OBJ/Country
  testFunc = function () {
    console.log("MY JS MADE IT!")
  };
  testFunc();

  var countryInput;
  var countryName;

  $("#add-country").on("click", function (event) {
    event.preventDefault();
    $("#results-table").empty();
    console.log("FIRST STOP:");
    countryInput = $("#country-name").val().trim();
    console.log("This is input:  " + countryInput);


    countryName = countryObj.find(function (element) {
      if (element.country == countryInput) {  // search string to find country 
        return element
      }
    });



    console.log("This is STILL input:  " + countryInput);

    console.log("This is it:  " + countryName.p_id);
    var countryP_id = countryName.p_id;



    var playlistID = countryP_id;  // This is the selected country's Playlist/Top 50 songs tracks.  // initially "Australia"
    var testObj;



    var queryURL = "https://api.spotify.com/v1/playlists/" + playlistID;

    $.ajax({
      url: queryURL,
      headers: {
        Authorization: 'Bearer ' + token
      },
      method: "GET"
    })
      .then(function (response) {
        testObj = response;

        // Console logs for 'response'
        console.log(testObj);
        console.log("Playlist Name:  " + testObj.description);
        console.log("List Length:  " + testObj.tracks.items["length"]);
        console.log("FIRST Artist's Name:  " + testObj.tracks.items[8].track.artists[0].name);
        // console.log("SECOND Artist's Name:  " + testObj.tracks.items[16].track.artists[1].name);
        console.log("Track Name:  " + testObj.tracks.items[8].track.name);

        // Example outputs for variables
        var playlistVar = testObj.description;
        var listLengthVar = testObj.tracks.items["length"];
        var firstArtist = testObj.tracks.items[8].track.artists[0].name;
        // var sndArtist = testObj.tracks.items[8].track.artists[1].name;
        var trackName = testObj.tracks.items[8].track.name;
        var ctyName = testObj.name;
        var previewURL;

        // Displays name of Playlist ie: "Australia's Top 50, length 50"
        // This was for my standalone HTML -> $("#head-div").html("<div class= 'jumbotron' >" + playlistVar + "<br>" + "Top 10" + " </div>");


        var testArry = testObj.tracks.items;
        console.log(testArry);
        console.log(testArry.length);

        testArry.length = 10;
        console.log(testArry.length);

        testArry.forEach(element => {
          console.log(element.track.artists[0].name);
          // console.log(element.track.artists[1].name);
          console.log(element.track.name);

        firstArtist = element.track.artists[0].name;
        trackName = element.track.name;
        previewURL = element.track.preview_url;
        song_ID = element.track.id;
        songURL = "https://open.spotify.com/embed/track/";
          // Find a way to incorporate the imbedded player with the tracks.  Uses the track's ID
          /* <iframe src="https://open.spotify.com/embed/track/4y3OI86AEP6PQoDE6olYhO" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */
      
        var outputTracks = $("<tr>")
            .append("<td>" + firstArtist + "</td>")
            .append("<td>" + trackName + "</td>")
            .append("<td>" + ctyName + "</td>")
            .append("<td>" + "<iframe src=" + songURL + song_ID + " " + "width='80' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"  + "</td>");
            $("#results-table").append(outputTracks);
        });
      });

  });


})