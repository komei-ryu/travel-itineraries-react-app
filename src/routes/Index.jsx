import { useLoaderData, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { fetchTrips, deleteTrip, addTrip } from "../api";
import { useState, useEffect } from "react";
import InfoCard from "../InfoCard";
import Input from "../Input";
import InputForm from "../InputForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const currTrips = useLoaderData();
  const [trips, setTrips] = useState(currTrips);
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [newTrip, setNewTrip] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [invalidInputMessage, setInvalidInputMessage] = useState("");

  useEffect(() => {
    document.title =
      "Travel Itineraries: Home - Lists the names of all trips; allows users to add and delete trips";
  }, []);

  return (
    <div className="mx-2">
      <h1 className="my-4">Home</h1>
      {isAddingTrip ? (
        <InfoCard>
          <InputForm
            input={() => {
              return (
                <Input
                  id="trip"
                  label="New Trip:"
                  value={newTrip}
                  isValid={isValidInput}
                  invalidMessage={invalidInputMessage}
                  onChange={(event) => {
                    const newTripName = event.target.value;
                    setNewTrip(newTripName);

                    // check if the new trip name is already in use
                    for (let i = 0; i < trips.length; i++) {
                      if (trips[i].name === newTripName) {
                        setIsValidInput(false);
                        setInvalidInputMessage("This name is already in use.");
                        return;
                      }
                    }

                    if (newTripName) {
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
              addTrip(newTrip)
                .then(() => {
                  // get new information from the database
                  return fetchTrips();
                })
                .then(
                  (trips) => {
                    // rerender UI
                    setTrips(trips);
                    setNewTrip("");
                    setIsAddingTrip(false);
                    setIsValidInput(false);
                    setInvalidInputMessage("");

                    // show success notification
                    toast.success("Your new trip has been created.");
                  },
                  (error) => {
                    // show error notification
                    toast.error(
                      "Oops, something went wrong. Please try again."
                    );
                  }
                );
            }}
            onCancelClick={() => {
              setNewTrip("");
              setIsAddingTrip(false);
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
            setIsAddingTrip(true);
          }}
        >
          Add Trip
        </button>
      )}
      {trips.map((trip) => {
        return (
          <InfoCard
            key={trip.id}
            cardTitle={trip.name}
            getButtons={() => {
              return [
                <Link
                  to={`/trips/${trip.id}`}
                  key="trip-details"
                  className="btn btn-primary me-3"
                >
                  View Trip Details
                </Link>,
                <button
                  key="delete-trip"
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    // update UI
                    const oldTrips = trips;
                    const newTrips = oldTrips.filter((tripInArray) => {
                      return tripInArray.id !== trip.id;
                    });
                    setTrips(newTrips);

                    deleteTrip(trip.id).then(
                      (response) => {
                        // show success notification
                        toast.success("Your trip has been deleted.");
                      },
                      (error) => {
                        // error: revert back to previous UI
                        setTrips(oldTrips);
                        console.log(error);

                        // show error notification
                        toast.error(
                          "Oops, something went wrong. Please try again."
                        );
                      }
                    );
                  }}
                >
                  Delete
                </button>,
              ];
            }}
          />
        );
      })}
    </div>
  );
}
