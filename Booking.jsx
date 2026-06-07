import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import Button from "../components/Button";

function Booking() {
  const navigate = useNavigate();

  const [room, setRoom] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (room === "") {
      alert("Select Room");
      return;
    }

    if (checkIn === "") {
      alert("Select Check In Date");
      return;
    }

    if (checkOut === "") {
      alert("Select Check Out Date");
      return;
    }

    alert(
      "Room Booked Successfully"
    );

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={submitHandler}
      >
        <h2>Room Booking</h2>

        <select
          value={room}
          onChange={(e) =>
            setRoom(e.target.value)
          }
        >
          <option value="">
            Select Room
          </option>

          <option value="Single Room">
            Single Room
          </option>

          <option value="Double Room">
            Double Room
          </option>

          <option value="Deluxe Room">
            Deluxe Room
          </option>

          <option value="Suite Room">
            Suite Room
          </option>
        </select>

        <input
          type="date"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(e.target.value)
          }
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) =>
            setCheckOut(e.target.value)
          }
        />

        <Button
          text="Confirm Booking"
          type="submit"
        />
      </form>
    </div>
  );
}

export default Booking;