import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ScheduleDetails = () => {
  const navigate = useNavigate();
  const fData = useSelector((state) => state.Schedule);
  const redData = useSelector((state) => state.Schedule.data);
  const [flight, setFlight] = useState({ ...redData });
  const [start, setStart] = useState(true);
  const [serverMessage, setServerMessage] = useState();
  var er = {};

  useEffect(() => {
    if (start) {
      setStart(false);
      if (fData.dataPresent) {
        console.log();
        navigate("/schedule");
      }
    }
  }, []);
  const [errors, updateErrors] = useState({});
  const putData = (event) => {
    const { name, value } = event.target;
    setFlight({ ...flight, [name]: value });
  };
  const validation = (value) => {
    const errors = {};
    if (!value.route_id || value.route_id.length < 1) {
      errors.route_id = "Route ID is Required";
    }
    if (!value.Time_of_Arrival) {
      errors.Time_of_Arrival = "Arrival Time is Required";
    }
    if (!value.Time_of_Departure) {
      errors.Time_of_Departure = "Departure Time is Required";
    }
    if (!value.fare) {
      errors.fare = "Fare is Required";
    }
    if (!value.tickets_left) {
      errors.tickets_left = "Tickets Left is Required";
    }

    er = errors;
    updateErrors((e) => errors);
    return errors;
  };
  const getDate = (today) => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
  const putCall = async () => {
    const dept_time = formatDateToISOString(new Date(flight.Time_of_Departure));
    const arr_time = formatDateToISOString(new Date(flight.Time_of_Arrival));
    validation(flight);
    if (Object.keys(er).length !== 0) {
      console.log(errors);
      return;
    }
    const response = await axios.put(
      `${API_URL}/change-schedule/${flight.schedule_id}`,
      {
        dept_time,
        arr_time,
        route_id: flight.route_id,
        fare: flight.fare,
        tickets_left: flight.tickets_left,
      }
    );
    if (response.data.success === true) {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
    } else {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
    }
  };

  const deleteCall = async () => {
    const response = await axios.post(`${API_URL}/delete-schedule`, {
      schedule_id: flight.schedule_id,
    });
    if (response.data.success === true) {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
    } else {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
    }
  };
  return (
    <div id="pdf-container">
      {serverMessage && !serverMessage.error && (
        <div className="alert alert-success">{serverMessage.msg}</div>
      )}
      {serverMessage && serverMessage.error && (
        <div className="alert alert-warning">{serverMessage.msg}</div>
      )}
      <div className="mx-auto my-5 p-5 wd-signup-container">
        <div className="row">
          <div className="col-6 d-flex ps-5">Origin:</div>
          <div className="col-6 d-flex ps-5">{flight.origin}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Destination:</div>
          <div className="col-6 d-flex ps-5">{flight.destination}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Route ID:</div>
          <div className="col-6 d-flex ps-5">{flight.route_id}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Schedule ID:</div>
          <div className="col-6 d-flex ps-5">{flight.schedule_id}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Departure Date:</div>
          <div className="col-6 d-flex ps-5">
            {getDate(new Date(flight.Time_of_Departure))}
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Departure Time:</div>
          <div className="col-6 d-flex ps-5">
            {new Date(flight.Time_of_Departure).getHours() +
              ":" +
              (new Date(flight.Time_of_Departure).getMinutes() < 10
                ? "0" + new Date(flight.Time_of_Departure).getMinutes()
                : new Date(flight.Time_of_Departure).getMinutes())}
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Arrival Date:</div>
          <div className="col-6 d-flex ps-5">
            {getDate(new Date(flight.Time_of_Departure))}
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Arrival Time:</div>
          <div className="col-6 d-flex ps-5">
            {" "}
            {new Date(flight.Time_of_Arrival).getHours() +
              ":" +
              (new Date(flight.Time_of_Arrival).getMinutes() < 10
                ? "0" + new Date(flight.Time_of_Arrival).getMinutes()
                : new Date(flight.Time_of_Arrival).getMinutes())}
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Price:</div>
          <div className="col-6 d-flex ps-5">{flight.fare}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex ps-5">Tickets Left:</div>
          <div className="col-6 d-flex ps-5">{flight.tickets_left}</div>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary rounded-pill me-5"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Update Schedule
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Schedule
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="">
                    <div className="form-floating my-3">
                      <input
                        className={`form-control${
                          errors.route_id ? " is-invalid" : ""
                        }`}
                        id="route_id"
                        name="route_id"
                        value={flight.route_id}
                        onChange={(event) => putData(event)}
                        type="text"
                        placeholder="Route ID"
                      />
                      <label htmlFor="route_id">Route ID</label>
                      <p className="text-danger">
                        {errors.route_id ? errors.route_id : ""}
                      </p>
                    </div>
                    <div className="form-floating my-3">
                      <input
                        className={`form-control${
                          errors.Time_of_Departure ? " is-invalid" : ""
                        }`}
                        id="Time_of_Departure"
                        name="Time_of_Departure"
                        onChange={(event) => putData(event)}
                        type="datetime-local"
                        value={flight.Time_of_Departure}
                      />
                      <label htmlFor="Time_of_Departure">Departs At</label>
                      <p className="text-danger">
                        {errors.Time_of_Departure
                          ? errors.Time_of_Departure
                          : ""}
                      </p>
                    </div>
                    <div className="form-floating my-3">
                      <input
                        className={`form-control${
                          errors.Time_of_Arrival ? " is-invalid" : ""
                        }`}
                        id="Time_of_Arrival"
                        name="Time_of_Arrival"
                        onChange={(event) => putData(event)}
                        type="datetime-local"
                        value={flight.Time_of_Arrival}
                      />
                      <label htmlFor="Time_of_Arrival">Arrives At</label>
                      <p className="text-danger">
                        {errors.Time_of_Arrival ? errors.Time_of_Arrival : ""}
                      </p>
                    </div>
                    <div className="form-floating my-3">
                      <input
                        className={`form-control${
                          errors.fare ? " is-invalid" : ""
                        }`}
                        id="fare"
                        name="fare"
                        value={flight.fare}
                        onChange={(event) => putData(event)}
                        type="text"
                        placeholder="Price"
                      />
                      <label htmlFor="fare">Price</label>
                      <p className="text-danger">
                        {errors.fare ? errors.fare : ""}
                      </p>
                    </div>
                    <div className="form-floating my-3">
                      <input
                        className={`form-control${
                          errors.tickets_left ? " is-invalid" : ""
                        }`}
                        id="tickets_left"
                        name="tickets_left"
                        value={flight.tickets_left}
                        onChange={(event) => putData(event)}
                        type="text"
                        placeholder="Tickets Left"
                      />
                      <label htmlFor="fare">Tickets Left</label>
                      <p className="text-danger">
                        {errors.tickets_left ? errors.tickets_left : ""}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    putCall();
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-danger rounded-pill ms-5"
          onClick={() => {
            deleteCall();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ScheduleDetails;
