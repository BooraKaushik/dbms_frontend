import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Schedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([
    {
      Time_of_Arrival: "2023-05-01 12:00:00",
      Time_of_Departure: "2023-05-01 10:00:00",
      destination: "TOR",
      fare: 200,
      origin: "NYC",
      route_id: "R01",
      schedule_id: 1,
      tickets_left: 1,
    },
  ]);

  useEffect(() => {
    getDataAction().then((data) => {
      setFlights(data);
    });
  }, []);
  const getDataAction = async () => {
    const response = await axios.get(`${API_URL}/available-schedules`);
    return response.data;
  };

  return (
    <>
      {flights && (
        <div className="mx-auto my-5 p-5 wd-signup-container">
          <div className="row mb-4">
            <div className="col-6 d-flex align-items-center ps-5">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  const newData = [...flights].sort((a, b) => a.fare - b.fare);
                  setFlights(newData);
                }}
              >
                Sort By Price: Low to High
              </a>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end pe-4">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  const newData = [...flights].sort(
                    (a, b) =>
                      new Date(a.Time_of_Departure) -
                      new Date(b.Time_of_Departure)
                  );
                  setFlights(newData);
                }}
              >
                Sort By Time
              </a>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-1">
              <h5>Origin</h5>
            </div>
            <div className="col-1">
              <h5>Destination</h5>
            </div>
            <div className="col-2">
              <h5>Route ID</h5>
            </div>
            <div className="col-2">
              <h5>Schedule ID</h5>
            </div>
            <div className="col-1">
              <h5>Arives</h5>
            </div>
            <div className="col-1">
              <h5>Departs</h5>
            </div>
            <div className="col-1">
              <h5>Price</h5>
            </div>
            <div className="col-2">
              <h5>Tickets Left</h5>
            </div>
            <div className="col-1"></div>
          </div>
          {flights.map((flight) => {
            return (
              <div className="row my-2" key={flight.schedule_id}>
                <div className="col-1  d-flex align-items-center justify-content-center">
                  {flight.origin}
                </div>
                <div className="col-1 d-flex align-items-center justify-content-center">
                  {flight.destination}
                </div>
                <div className="col-2  d-flex align-items-center justify-content-center">
                  {flight.route_id}
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  {flight.schedule_id}
                </div>
                <div className="col-1  d-flex align-items-center justify-content-center">
                  {new Date(flight.Time_of_Arrival).getHours() +
                    ":" +
                    (new Date(flight.Time_of_Arrival).getMinutes() < 10
                      ? "0" + new Date(flight.Time_of_Arrival).getMinutes()
                      : new Date(flight.Time_of_Arrival).getMinutes())}
                </div>
                <div className="col-1 d-flex align-items-center justify-content-center">
                  {new Date(flight.Time_of_Departure).getHours() +
                    ":" +
                    (new Date(flight.Time_of_Departure).getMinutes() < 10
                      ? "0" + new Date(flight.Time_of_Departure).getMinutes()
                      : new Date(flight.Time_of_Departure).getMinutes())}
                </div>
                <div className="col-1 d-flex align-items-center justify-content-center">
                  {flight.fare}
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  {flight.tickets_left}
                </div>

                <div className="col-1">
                  <button
                    className="btn btn-primary rounded-pill "
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_SCHEDULE",
                        transfer: flight,
                      });
                      navigate(`/scheduledetails`);
                    }}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Schedule;
