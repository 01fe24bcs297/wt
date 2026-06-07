import {
  useNavigate,
} from "react-router-dom";

import RoomCard from "../components/RoomCard";

import Button from "../components/Button";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Available Rooms</h2>

      <div className="card-container">
        <RoomCard
          type="Single Room"
          price="1000"
        />

        <RoomCard
          type="Double Room"
          price="2000"
        />

        <RoomCard
          type="Deluxe Room"
          price="3500"
        />

        <RoomCard
          type="Suite Room"
          price="5000"
        />
      </div>

      <Button
        text="Book Room"
        onClick={() =>
          navigate("/booking")
        }
      />
    </div>
  );
}

export default Dashboard;