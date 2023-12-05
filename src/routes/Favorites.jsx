import "bootstrap/dist/css/bootstrap.css";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import InfoCard from "../InfoCard";
import { updateFavorite } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const favorites = useLoaderData();
  const [favoritedLocations, setFavoritedLocations] = useState(favorites);

  useEffect(() => {
    document.title =
      "Travel Itineraries: Favorites - Lists the names of the locations that have been favorited and when they were favorited; allows users to remove locations from their favorites";
  }, []);

  return (
    <div className="mx-2">
      <h1 className="my-4">Favorited Locations</h1>
      {favoritedLocations.map((location) => {
        return (
          <InfoCard
            key={location.id}
            cardTitle={location.location}
            getTitleButtons={() => {
              return [
                <button
                  key="star"
                  type="button"
                  className="btn"
                  onClick={() => {
                    // optimistic UI: changes UI first, then update database
                    const oldFavoritedLocations = favoritedLocations.map(
                      (location) => {
                        return { ...location };
                      }
                    );
                    const newFavoritedLocations = oldFavoritedLocations.filter(
                      (locationInArray) => {
                        return locationInArray.id !== location.id;
                      }
                    );
                    setFavoritedLocations(newFavoritedLocations);
                    updateFavorite(location.id, false).then(
                      (response) => {
                        // show success notification
                        toast.success(
                          "You have successfully unfavorited this location."
                        );
                      },
                      (error) => {
                        // error: revert back to previous UI
                        setFavoritedLocations(oldFavoritedLocations);

                        // show error notification
                        toast.error(
                          "Oops, something went wrong. Please try again."
                        );
                      }
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faStar} color="yellow" size="2x" />
                </button>,
              ];
            }}
          >
            {location.timeFavorited &&
              `Location was favorited at ${location.timeFavorited}`}
          </InfoCard>
        );
      })}
    </div>
  );
}
