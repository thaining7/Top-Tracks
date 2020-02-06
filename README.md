# Top Tracks

Search a country anywhere in the world to find it's top 10 most popular music tracks!

https://thaining7.github.io/Top-Tracks/

## Team Members:

* Leevie Martin
* Robert Chen
* Dmitriy Petrenko
* Trevor Haining

## Description

Provide a data snapshot of a country’s collective popular music preferences from which one can gain perspective of a nation’s culture

## Technologies Used:

* Node.js
* Express.js
* JavaScript
* jQuery
* Materialize CSS
* Google Maps API
* Spotify API
* Firebase

## Features

Sample songs using the embedded music player

## Code Example

When the "Submit" button is clicked:
```
$("#add-country").on("click", function (event) {
        event.preventDefault();

        var firstName = $("#first_name").val().trim();
        var lastName = $("#last_name").val().trim();
        var countryName = $("#country-name").val().trim();

        var userData = {
            firstname: firstName,
            lastname: lastName,
            country: countryName
        };

        database.ref().push(userData);

    });
```

## Screenshots

![App Screenshot](/assets/images/Screenshot.png)

## How to Use

* Enter your first and last name 
* Select a Country of your choice from the drop down menu and click the "Submit" button 
* The application will display the top 10 most popular tracks from the Spotify API and load the location on Google Maps
