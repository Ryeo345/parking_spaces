import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { updateListing } from "../store/listings";
import { useNavigate } from "react-router-dom";

const IndividualListing = () => {
  const { listings, auth } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const rentSpot = async (ev) => {
    ev.preventDefault();
    dispatch(
      updateListing({
        id: listing.id,
        expiry_date: selectedDate,
        tenantId: auth.id,
        bookingStatus: "OCCUPIED",
      })
    );
    navigate("/rentals");
  };

  const listing = listings.find((listing) => listing.id === id);
  if (!listing) {
    // prevents the React app from crashing when the page is refreshed
    return null;
  }
  return (
      <div className="listing-details-container">
        <div className="listing-details-info">
          <div className= "listing-status">
            <span>{listing.bookingStatus} for ${listing.monthly_price} per month</span>
          </div>
          <div className="listing-details-img">
            <img src={listing.photo} />
          </div>
          <div className="listing-details-dimensions">
            <span>
              {listing.length} X {listing.width} {listing.storage_type}
            </span>
          </div>
          <div className="listing-details-city-state">
            <span>
              {listing.city}, {listing.state}
            </span>
          </div>{" "}
          <div className="listing-details-summary">
            <span>{listing.summary}</span>
          </div>{" "}
          <div className= "listing-status">
            <span>{listing.bookingStatus} for ${listing.monthly_price} per month</span>
          </div>
          <div>
            {listing.bookingStatus === "OCCUPIED" ? (
              <span>{listing.expiry_date}</span>
            ) : null}
          </div>
        </div>
        <div className="listing-details-form">
            {listing.bookingStatus === "AVAILABLE" &&
            listing.userId !== auth.id ? (
              <form onSubmit={rentSpot}>
                <DatePicker
                  label="Expiry Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Button type="submit" variant="contained">
                  Rent Now
                </Button>
              </form>
            ) : null}
        </div>
      </div>
  );
};

export default IndividualListing;
