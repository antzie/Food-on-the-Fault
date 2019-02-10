// JavaScript Version 9-02-2019

// FourSquare API keys
const CLIENT_ID = "RUMAHAKPDQVGVU3UPGYU10CSNBRBLE4IPTVQGLMDOWTSDW1H";
const CLIENT_SECRET = "4OPZRQLGB2QFRUF20MRUVOTJYR3MC3ACNRMCUI4QF0KU2Q4Y";

function getDataAgain(callback) {
 $.ajax({
      url: '/locationsJSON/',
      type: 'GET',
      success: callback,
  }).done(function(data) {
      let response = data.categories;
      response.forEach(function(category) {
        const latitude = parseFloat(category.latitude);
        const longitude = parseFloat(category.longitude);
        category.location = {lat: latitude, lng: longitude};
      });
      const locationsData = response;
      initMap(locationsData);
    }).fail(function(jqXHR, exception) {
      console.log(jqXHR.statusText);
      console.log(exception);
      const serverErrorString = ('Uh oh... Something went wrong with the server. See Javascript Console');
      showError(serverErrorString);
    });
}


function initMap(locationsData) {
  // Instantiate (and display) a map object:
  let map = new google.maps.Map(document.getElementById("map-content"), {
    center: { lat: -41.29342, lng: 174.78119 }, // Wellington NZ
    zoom: 13
  });

  // Map Icons
  const blueIconURL = "https://maps.google.com/mapfiles/kml/paddle/blu-blank.png";
  const ltBlueIconURL =
    "https://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png";
  const defaultIcon = changeMarker(blueIconURL);
  const highlightedIcon = changeMarker(ltBlueIconURL);

  // Markers & InfoWindows.
  let markers = [];
  for (let i = 0; i < locationsData.length; i++) {
    // Get position and title from locationsData
    const position = locationsData[i].location;
    const title = locationsData[i].name;

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
      icon: defaultIcon
    });

    // Add unique objects to marker.
    marker.ll = locationsData[i].ll; // Foursquare Lat Lng Configuration.
    marker.infoWindow = new google.maps.InfoWindow({});

    //Populate marker's infoWindow.
    fourSquareData(marker);

    // Add Listeners to the marker.

    infoWindowListener(marker);

    // On mouseover/off change Icon colour.
    highlightMarker(marker);

    // Push the marker to our array of markers.
    markers.push(marker);
  }

  // Close all infowindows on click anywhere on map.
  google.maps.event.addListener(map, "click", function() {
    closeAllInfoWindows();
  });

  // Functions

  // 3rd Party API: Foursquare. https://foursquare.com/

  // Request Foursquare's Venue ID associated with a marker, based on lat and long (ll).
  // Request Detailed Venue Information using Venue ID from first request.
  // Populate InfoWindow of marker using Detailed Venue Information.
  function fourSquareData(marker) {
    const foursquareUrl =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET +
      "&v=20180323&limit=1&ll=" +
      marker.ll +
      "&format=json";

    // Request 1: Venue ID
    $.ajax({
      url: foursquareUrl
    })
      .done(function(data) {
        // Extract Venue ID out from Response.
        const venue = data.response.venues[0];
        const venue_id = venue.id;

        // Request 2:
        // Detailed Venue Info and Populate InfoWindow.
        specificVenueInfo(venue_id, marker);
      })
      .fail(function(jqXHR, exception) {
        const contentString =
          '<div id="content">' +
          '<h3 id="infoHeading"> ' +
          "Error" +
          "</h3>" +
          "<p> Information not currently available.</br>" +
          "Developers - see console</p>" +
          "</div>";
        marker.infoWindow.setContent(contentString);
        console.log(jqXHR.statusText);
        console.log(exception);
      });
  }

  // Detailed Venue Info and Populate InfoWindow.
  function specificVenueInfo(VENUE_ID, marker) {
    const detailedVenueURL =
      "https://api.foursquare.com/v2/venues/" +
      VENUE_ID +
      "?client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET +
      "&v=20181230";
    //const fsqAttributionURL = "http://foursquare.com/v2/" + VENUE_ID + "?ref=" + CLIENT_ID;
     $.ajax({
      url: detailedVenueURL
    })
      .done(function(data) {
        //console.log(data)
        const specificVenue = data.response.venue;

        const venueName = specificVenue.name;
        const venueAddress = specificVenue.location.address;
        let venueUrl = specificVenue.url;
        let venueRating = specificVenue.rating;
        const venueCategory = specificVenue.categories[0].name;
        // Create URL to Foursquare Venue Page to statisfy Foursquare's Attribution requirements
        const fourSqAttributeURL = specificVenue.canonicalUrl + "?ref=" + CLIENT_ID;

        // If venue does not yet have a rating
        if (venueRating === null) {
          venueRating = "--";
        }

        // If Foursquare does not have venue's own website,
        // Connect instead to Foursquare's webpage for that venue.
        if (venueUrl === null) {
          venueUrl  = specificVenue.canonicalUrl;
        }

        const contentString =
          '<div id="info-content">' +
          '<h3 id="infoHeading">' + venueName + "</h3>" +
          "<ul>" +
          "<li>" + venueCategory + "</li>" +
          "<li>" + venueAddress + "</li>" +
          "<li>Rating: <strong>" + venueRating + "/10</strong></li>" +
          "<li><a href=" + venueUrl + " target='_blank'>" + venueName + "'s Website</a></li>" +
          "</ul>" +
          "<p><em> Information retrieved from <a href='https://foursquare.com' target='_blank'>Foursquare API</a><br>" +
            "Venue Information: <a href=" + fourSqAttributeURL + " target='_blank'> Foursquare Venue</a> </em></p>" +
          "</div>";
        marker.infoWindow.setContent(contentString);
      })
      .fail(function(jqXHR, exception) {
        const contentString =
          '<div id="content">' +
          '<h3 id="infoHeading"> ' +
          "Error" +
          "</h3>" +
          "<p> Information not currently available.</br>" +
          "Try again in a little while. </br>" +
          " Developers - see console</p>" +
          "</div>";
        marker.infoWindow.setContent(contentString);
        console.log(jqXHR.statusText);
        console.log(exception);
      });
  }

  // OnClick Open/Close Infowindow and Bounce associated map marker.
  function infoWindowListener(marker) {
    marker.addListener("click", function() {
      openInfoWindow(marker);
      toggleBounce(marker);
    });
  }

  // Open Associated InfoWindow
  function openInfoWindow(marker) {
    // Close all other infoWindows
    markers.forEach(function(marker) {
      marker.infoWindow.close();
    });
    // Open correct InfoWindow
    marker.infoWindow.open(map, marker);
  }

  // Toggle marker Bounce and turn off after 3 bounces.
  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 2250); // set for 3 bounces
    }
  }

  // Change icon colour as mouse moves over/off marker.
  function highlightMarker(marker) {
    marker.addListener("mouseover", function() {
      marker.setIcon(highlightedIcon);
    });
    marker.addListener("mouseout", function() {
      marker.setIcon(defaultIcon);
    });
  }

  function changeMarker(markerURL) {
    marker = {
      url: markerURL,
      size: new google.maps.Size(34, 34),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(10, 34),
      scaledSize: new google.maps.Size(24, 34)
    };
    return marker;
  }

  function closeAllInfoWindows() {
    markers.forEach(function(markerObj) {
      markerObj.infoWindow.close();
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  /** Knockout **/

  const Venue = function(data) {
    this.name = ko.observable(data.name);
    this.type = ko.observable(data.type);
    this.latLng = ko.observable(data.location); // Note: an object
    this.marker = "";
  };

  const ViewModel = function() {
    const self = this;

    self.locations = ko.observableArray(); // Locations Array
    self.filterObject = ko.observable(""); // Object to filter list by
    self.types = ko.observableArray(); // List of Types of Venue.

    // Populate locations array with all data from locationsData.
    // Simultaneously populate types from locationsData.
    locationsData.forEach(function(item) {
      self.locations.push(new Venue(item));
      self.types.push(item.type);
    });

    // Connect each location in self.locations with
    // the google marker for that particular venue. 
    // Will Enable future interactions between location and marker
    for (i = 0; i < self.locations().length; i += 1) {
      self.locations()[i].marker = markers[i];
    }

    // Filters Section ///

    // Create a unique filters array from the types array.
    self.types.push("All"); // Add type all - not in locationsData.
    self.filters = ko.utils.arrayGetDistinctValues(self.types().sort());

    // Filter List of Locations in UI.
    // Use Filter to toggle markers visible/invisible.
    self.filteredItems = ko.computed(function() {
      const filter = self.filterObject();

      if (!filter || filter == "All") {
        self.locations().forEach(function(object) {
          object.marker.setVisible(true);
        });
        return self.locations();
      } else {
        const filtered = ko.utils.arrayFilter(self.locations(), function(object) {
          return object.type() == filter;
        });
        const unFiltered = ko.utils.arrayFilter(self.locations(), function(
          object
        ) {
          return object.type() != filter;
        });

        filtered.forEach(function(object) {
          object.marker.setVisible(true);
        });

        unFiltered.forEach(function(object) {
          object.marker.setVisible(false);
        });

        return filtered;
      }
    });

    // Open Associated InfoWindow on List Item Click
    self.openWindow = function(marker) {
      openInfoWindow(marker);
      toggleBounce(marker);
    };

  }; // Close Bracket for ViewModel.

  ko.applyBindings(new ViewModel());
} // Close Bracket for initMap.




// On Google Map error provide an error message in the div map-content.
// Define error message and pass to showError()
function mapError() {
  mapErrorString = ("Oh dear... Something went wrong with Google Maps. See Javascript Console");
  showError(mapErrorString);
}

// Turn the Google Map Area into a pretty Error Message Area.
// Makes new div inside map-content and styles map-content.
function showError(errorString) {
  const mapArea =  document.getElementById('map-content');
  const mapError = document.createElement("div");
  mapError.setAttribute('class', 'map-error');

  mapError.appendChild(document.createTextNode(errorString));
  mapArea.appendChild(mapError);
  mapArea.style.backgroundColor = 'rgb(35, 138, 150)'; /*teal*/
}

// Move side list left by same amount as its width.
    function toggleHangouts() {
      var listDiv = document.getElementById("side-list");
      var width = document.getElementById('side-list').offsetWidth;
      if (listDiv.style.marginLeft === "0px" || listDiv.style.marginLeft === '') {
        listDiv.style.marginLeft = -width + "px";
      } else {
        listDiv.style.marginLeft = "0px";
      }
    }