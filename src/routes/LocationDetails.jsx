import "bootstrap/dist/css/bootstrap.css";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { updateDescription, updateFavorite } from "../api";
import { useState, useEffect } from "react";
import InfoCard from "../InfoCard";
import InputForm from "../InputForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const location = useLoaderData();
  const [currDescription, setCurrDescription] = useState(location.description);
  const [newDescription, setNewDescription] = useState(location.description);
  const [isFavorite, setIsFavorite] = useState(location.favorited);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    document.title = `Travel Itineraries: ${location.location} Description - Displays the description of ${location.location} added by the user; allows users to update the description`;
  }, [location.location]);

  return (
    <div className="mx-2">
      <div className="row my-4">
        <h1 className="col-8">{location.location} Description</h1>
        <button
          type="button"
          className="btn col-4"
          onClick={() => {
            // optimistic UI: changes UI first, then update database
            const newIsFavorite = !isFavorite;
            setIsFavorite(newIsFavorite);
            updateFavorite(location.id, newIsFavorite).then(
              (response) => {
                // show success notification
                if (newIsFavorite) {
                  toast.success(
                    "You have successfully favorited this location."
                  );
                } else {
                  toast.success(
                    "You have successfully unfavorited this location."
                  );
                }
              },
              (error) => {
                // revert back to previous UI
                setIsFavorite(!newIsFavorite);

                // show error notification
                toast.error("Oops, something went wrong. Please try again.");
              }
            );
          }}
        >
          <FontAwesomeIcon
            icon={faStar}
            color={isFavorite ? "yellow" : "#eee"}
            size="3x"
          />
        </button>
      </div>
      <p className={`fs-5 mx-4 ${isUpdating ? "mb-5" : "mb-4"}`}>
        {currDescription}
      </p>

      {isUpdating ? (
        <InfoCard>
          <InputForm
            input={() => {
              return (
                <>
                  <label htmlFor="description" className="form-label">
                    Please input a new description for {location.location} (can
                    be empty):
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={newDescription}
                    onChange={(event) => {
                      setNewDescription(event.target.value); // extract value of textarea
                    }}
                  />
                </>
              );
            }}
            onSubmit={(event) => {
              event.preventDefault(); // prevent the form submission, which refreshes the page
              const oldDescription = currDescription;
              setCurrDescription(newDescription);
              setIsUpdating(false);

              updateDescription(location.id, newDescription).then(
                (response) => {
                  // show success notification
                  toast.success(
                    "Your description of the location has been updated."
                  );
                },
                (error) => {
                  // revert to previous state
                  setCurrDescription(oldDescription);
                  setIsUpdating(true);

                  // show error notification
                  toast.error("Oops, something went wrong. Please try again.");
                }
              );
            }}
            onCancelClick={() => {
              setIsUpdating(false);
              setNewDescription(currDescription);
            }}
          />
        </InfoCard>
      ) : (
        <button
          type="button"
          className="btn btn-primary mx-4"
          onClick={() => {
            setIsUpdating(true);
          }}
        >
          Update Description
        </button>
      )}
    </div>
  );
}
