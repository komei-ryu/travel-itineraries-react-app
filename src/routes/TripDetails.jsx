import { useLoaderData, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  addLocation,
  deleteDate,
  deleteLocation,
  fetchTripDetails,
  addDate,
} from "../api";
import { useState, useEffect } from "react";
import InfoCard from "../InfoCard";
import Input from "../Input";
import InputForm from "../InputForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const data = useLoaderData();
  const trip = data.trip;
  const [dates, setDates] = useState(data.dates);

  // if user is not adding location for any date, updatingDateId is -1
  // otherwise, updatingDateId is the id of the date that the user is adding a location to
  const [updatingDateId, setUpdatingDateId] = useState("-1");

  const [newLocation, setNewLocation] = useState("");
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [invalidInputMessage, setInvalidInputMessage] = useState("");

  useEffect(() => {
    document.title = `Travel Itineraries: ${trip.name} - Provides an overview of the trip by listing the dates of this trip and the locations of each date; allows users to add and delete dates and locations`;
  }, [trip.name]);

  return (
    <div className="mx-2">
      <h1 className="my-4">{trip.name}</h1>
      {isAddingDate ? (
        <InfoCard>
          <InputForm
            input={() => {
              return (
                <Input
                  id="date"
                  label="New Date:"
                  value={newDate}
                  isValid={isValidInput}
                  invalidMessage={invalidInputMessage}
                  onChange={(event) => {
                    const newDateInput = event.target.value;

                    setNewDate(newDateInput);

                    // check if the input is a valid date
                    if (isNaN(new Date(newDateInput))) {
                      setIsValidInput(false);
                      setInvalidInputMessage("Input is not a valid date");
                      return;
                    }

                    // check if the new date is already in use
                    for (let i = 0; i < dates.length; i++) {
                      if (dates[i].date === newDateInput) {
                        setIsValidInput(false);
                        setInvalidInputMessage("This date is already added.");
                        return;
                      }
                    }

                    if (newDateInput) {
                      setIsValidInput(true);
                    } else {
                      setIsValidInput(false);
                    }
                  }}
                />
              );
            }}
            onSubmit={(event) => {
              event.preventDefault();

              // do not update if form has invalid input
              if (!isValidInput) return;

              // update database
              addDate(newDate, trip.id)
                .then(
                  (response) => {
                    // show success notification
                    toast.success("Your new date has been added.");
                  },
                  (error) => {
                    // show error notification
                    toast.error(
                      "Oops, something went wrong. Please try again."
                    );
                  }
                )
                .then(() => {
                  // get new information from the database
                  return fetchTripDetails(trip.id);
                })
                .then((data) => {
                  // rerender UI
                  setDates(data.dates);
                  setNewDate("");
                  setIsAddingDate(false);
                  setIsValidInput(false);
                  setInvalidInputMessage("");
                });
            }}
            onCancelClick={() => {
              setNewDate("");
              setIsAddingDate(false);
              setIsValidInput(false);
              setInvalidInputMessage("");
            }}
          />
        </InfoCard>
      ) : (
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => {
            setIsAddingDate(true);

            // close the form for adding location
            setUpdatingDateId("-1");
            setNewLocation("");
          }}
        >
          Add Date
        </button>
      )}
      <div>
        {dates.map((date) => {
          return (
            <InfoCard
              key={date.id}
              cardTitle={date.date}
              getTitleButtons={() => {
                return [
                  <button
                    key="add-location"
                    type="button"
                    className="btn btn-info h-75"
                    onClick={() => {
                      setUpdatingDateId(date.id);

                      // close the form for adding date
                      setNewDate("");
                      setIsAddingDate(false);
                    }}
                  >
                    Add New Location
                  </button>,
                  <button
                    key="delete-date"
                    type="button"
                    className="btn btn-danger h-75 ms-5"
                    onClick={() => {
                      // update database
                      deleteDate(date.id)
                        .then(
                          (response) => {
                            // show success notification
                            toast.success("Your date has been deleted.");
                          },
                          (error) => {
                            // show error notification
                            toast.error(
                              "Oops, something went wrong. Please try again."
                            );
                          }
                        )
                        .then(() => {
                          // get new information from the database
                          return fetchTripDetails(trip.id);
                        })
                        .then((data) => {
                          // rerender UI
                          setDates(data.dates);
                        });
                    }}
                  >
                    Delete Date
                  </button>,
                ];
              }}
            >
              {updatingDateId === date.id && (
                <InfoCard>
                  <InputForm
                    input={() => {
                      return (
                        <Input
                          id="location"
                          label="New Location:"
                          value={newLocation}
                          isValid={isValidInput}
                          invalidMessage={invalidInputMessage}
                          onChange={(event) => {
                            const newLocationInput = event.target.value;
                            setNewLocation(newLocationInput);

                            // check if the new trip name is already in use
                            for (let i = 0; i < date.locations.length; i++) {
                              if (
                                date.locations[i].location === newLocationInput
                              ) {
                                setIsValidInput(false);
                                setInvalidInputMessage(
                                  "This location is already added."
                                );
                                return;
                              }
                            }

                            if (newLocationInput) {
                              setIsValidInput(true);
                            } else {
                              setIsValidInput(false);
                            }
                          }}
                        />
                      );
                    }}
                    onSubmit={(event) => {
                      event.preventDefault();

                      // do not update if form has invalid input
                      if (!isValidInput) return;

                      // update database
                      addLocation(newLocation, date.id)
                        .then(
                          (response) => {
                            // show success notification
                            toast.success("Your new location has been added.");
                          },
                          (error) => {
                            // show error notification
                            toast.error(
                              "Oops, something went wrong. Please try again."
                            );
                          }
                        )
                        .then(() => {
                          // get new information from the database
                          return fetchTripDetails(trip.id);
                        })
                        .then((data) => {
                          // rerender UI
                          setDates(data.dates);
                          setUpdatingDateId("-1");
                          setNewLocation("");
                          setIsValidInput(false);
                          setInvalidInputMessage("");
                        });
                    }}
                    onCancelClick={() => {
                      setUpdatingDateId("-1");
                      setNewLocation("");
                      setIsValidInput(false);
                      setInvalidInputMessage("");
                    }}
                  />
                </InfoCard>
              )}
              <ul
                className={`${updatingDateId === "-1" ? "mt-1w" : "mt-3"} mb-0`}
              >
                {date.locations.map((location) => {
                  return (
                    <li key={location.id} className="mb-2">
                      <span className="fs-5 me-5">{location.location}</span>
                      <Link
                        to={`/locations/${location.id}`}
                        className="btn btn-outline-info"
                      >
                        View Location Description
                      </Link>
                      <button
                        className="btn btn-outline-danger ms-5"
                        onClick={() => {
                          // update database
                          deleteLocation(location.id)
                            .then(
                              (response) => {
                                // show success notification
                                toast.success(
                                  "Your location has been deleted."
                                );
                              },
                              (error) => {
                                // show error notification
                                toast.error(
                                  "Oops, something went wrong. Please try again."
                                );
                              }
                            )
                            .then(() => {
                              // get new information from the database
                              return fetchTripDetails(trip.id);
                            })
                            .then((data) => {
                              // rerender UI
                              setDates(data.dates);
                            });
                        }}
                      >
                        Delete Location
                      </button>
                    </li>
                  );
                })}
              </ul>
            </InfoCard>
          );
        })}
      </div>
    </div>
  );
}
