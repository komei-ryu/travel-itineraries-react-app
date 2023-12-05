// environment variable defined in a .env file
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// get all trips
export function fetchTrips() {
  return fetch(`${baseUrl}/trips`).then((response) => {
    return response.json();
  });
}

// get data particular to this trip and its dates and locations
export function fetchTripDetails(tripId) {
  return fetchTrips()
    .then((tripsData) => {
      for (let i = 0; i < tripsData.length; i++) {
        if (tripsData[i].id === tripId) return tripsData[i];
      }
      return null;
    })
    .then((tripData) => {
      return fetch(`${baseUrl}/dates?_embed=locations`)
        .then((response) => {
          return response.json();
        })
        .then((datesData) => {
          return {
            trip: tripData,
            dates: datesData.filter((date) => {
              return date.tripId === tripId;
            }),
          };
        });
    });
}

// delete a date and its locations
export function deleteDate(dateId) {
  return fetch(`${baseUrl}/dates/${dateId}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
}

// delete a trip, including its dates and locations
export function deleteTrip(tripId) {
  // find the dates of the trip that we want to delete
  return fetchTripDetails(tripId)
    .then((response) => {
      return response.dates;
    })
    .then((dates) => {
      // delete the dates and their locations
      Promise.all(
        dates.map((date) => {
          return deleteDate(date.id);
        })
      );
    })
    .then(() => {
      // delete the trip from the database
      return fetch(`${baseUrl}/trips/${tripId}`, {
        method: "DELETE",
      });
    })
    .then((response) => {
      return response.json();
    });
}

// get all locations
export function fetchLocations() {
  return fetch(`${baseUrl}/locations`).then((response) => {
    return response.json();
  });
}

// get information about a particular location
export function fetchOneLocation(locationId) {
  return fetchLocations().then((locations) => {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].id === locationId) return locations[i];
    }
    return null;
  });
}

// update whether a location has been favorited
export function updateFavorite(locationId, isFavorite) {
  return fetch(`${baseUrl}/locations/${locationId}`, {
    method: "PATCH",
    body: JSON.stringify({
      favorited: isFavorite, // update favorited attribute
      timeFavorited: Date().toString(), // update the time the user changed the favorited status
    }),
    // indicates that we are sending json
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// update description of a location
export function updateDescription(locationId, newDescription) {
  return fetch(`${baseUrl}/locations/${locationId}`, {
    method: "PATCH",
    body: JSON.stringify({
      description: newDescription,
    }),
    // indicates that we are sending json
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// get locations that have been favorited
export function fetchFavoritedLocations() {
  return fetchLocations().then((locations) => {
    return locations.filter((location) => {
      return location.favorited;
    });
  });
}

// add a new location
export function addLocation(location, dateId) {
  return fetch(`${baseUrl}/locations`, {
    method: "POST",
    // id is automatically added
    body: JSON.stringify({
      location: location,
      description: "",
      favorited: false,
      timeFavorited: Date().toString(),
      dateId: dateId,
    }),
    // indicates that we are sending json
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// delete a location
export function deleteLocation(locationId) {
  return fetch(`${baseUrl}/locations/${locationId}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
}

// add a new date
export function addDate(date, tripId) {
  return fetch(`${baseUrl}/dates`, {
    method: "POST",
    // id is automatically added
    body: JSON.stringify({
      date: date,
      tripId: tripId,
    }),
    // indicates that we are sending json
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// add a new trip
export function addTrip(name) {
  return fetch(`${baseUrl}/trips`, {
    method: "POST",
    // id is automatically added
    body: JSON.stringify({
      name: name,
    }),
    // indicates that we are sending json
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
