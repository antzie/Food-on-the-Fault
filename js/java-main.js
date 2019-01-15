// JavaScript Version 14-01-2019

// FourSquare API keys
CLIENT_ID = "RUMAHAKPDQVGVU3UPGYU10CSNBRBLE4IPTVQGLMDOWTSDW1H";
CLIENT_SECRET = "4OPZRQLGB2QFRUF20MRUVOTJYR3MC3ACNRMCUI4QF0KU2Q4Y";

const locationsData = [
  {
    location: { lat: -41.292883, lng: 174.778853 },
    name: "BurgerFuel",
    type: "Burgerjoint",
    ll: "-41.292838,174.778846" // Laititude and Longitude stored as string in Foursquare format for finding venues
  },

  {
    location: { lat: -41.296555, lng: 174.774423 },
    name: "Southern Cross",
    type: "Restaurant",
    ll: "-41.296555,174.774423"
  },

  {
    location: { lat: -41.29334, lng: 174.77553 },
    name: "1154 Pastaria",
    type: "Restaurant",
    ll: "-41.293340,174.775530"
  },

  {
    location: { lat: -41.294907, lng: 174.774969 },
    name: "Ombra",
    type: "Restaurant",
    ll: "-41.294907,174.774969"
  },

  {
    location: { lat: -41.293563, lng: 174.781084 },
    name: "Library Bar",
    type: "Bar",
    ll: "-41.293563,174.781084"
  },

  {
    location: { lat: -41.29495, lng: 174.78016 },
    name: "HawThorn Lounge",
    type: "Bar",
    ll: "-41.294950,174.780160"
  },

  {
    location: { lat: -41.2934, lng: 174.7758 },
    name: "Scopa Caffé Cucina",
    type: "Restaurant",
    ll: "-41.293400,174.775800"
  },

  {
    location: { lat: -41.28019, lng: 174.77625 },
    name: "The Old Bailey",
    type: "Bar",
    ll: "-41.280190,174.776250"
  },

  {
    location: { lat: -41.28766, lng: 174.77656 },
    name: "Gotham's Cafe",
    type: "Cafe",
    ll: "-41.287660,174.776560"
  }
];


function initMap() {
  // Instantiate (and display) a map object:
  map = new google.maps.Map(document.getElementById("map-content"), {
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
  markers = [];
  for (let i = 0; i < locationsData.length; i++) {
    // Get position and title from locationsData
    const position = locationsData[i].location;
    const title = locationsData[i].name;

    // Create a marker per location, and put into markers array.
    marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
      icon: defaultIcon
    });

    // Add unique objects to marker.
    marker["ll"] = locationsData[i].ll; // Foursquare Lat Lng Configuration.
    marker["infoWindow"] = new google.maps.InfoWindow({});

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
    jqxhr = $.ajax({
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

    jqxhr = $.ajax({
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

        // If venue does not yet have a rating
        if (venueRating == null) {
          venueRating = "--";
        }

        // If Foursquare does not have venue's own website,
        // Connect instead to Foursquare's webpage for that venue.
        if (venueUrl == null) {
          venueUrl  = specificVenue.canonicalUrl;
        }

        const contentString =
          '<div id="info-content">' +
          '<h3 id="infoHeading">' + venueName + "</h3>" +
          "<ul>" +
          "<li>" + venueCategory + "</li>" +
          "<li>" + venueAddress + "</li>" +
          "<li>Rating: <strong>" + venueRating + "/10</strong></li>" +
          "<li><a href=" + venueUrl + " target='_blank'>Website</a></li>" +
          "</ul>" +
          '<p><em> Information retrieved from <a href="https://foursquare.com">Foursquare API</a></em></p>' +
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

  const venue = function(data) {
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
      self.locations.push(new venue(item));
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
// Make new div inside map-content and style map-content.
function mapError() {

  const mapArea =  document.getElementById('map-content')
  const mapError = document.createElement("div");
  mapError.setAttribute('class', 'map-error');
  const errorString = "Oh dear... Something went wrong with Google Maps. See Javascript Console"

  mapError.appendChild(document.createTextNode(errorString));
  mapArea.appendChild(mapError);
  mapArea.style.backgroundColor = 'rgb(35, 138, 150)'; /*teal*/
}