import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Schedule = () => {
  var er = {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, updateRefresh] = useState(false);
  const [schedule, setSchedule] = useState({
    dept_time: "",
    arr_time: "",
    route_id: "",
    fare: 0,
    tickets_left: 0,
    aircraft_id: "",
  });
  const [flights, setFlights] = useState();

  useEffect(() => {
    getDataAction().then((data) => {
      setFlights(data);
    });
  }, []);
  const getDataAction = async () => {
    const response = await axios.get(`${API_URL}/available-schedules`);
    return response.data;
  };
  const [errors, updateErrors] = useState({});
  const [serverMessage, setServerMessage] = useState();

  const validation = (value) => {
    const errors = {};
    if (!value.route_id || value.route_id.length < 1) {
      errors.route_id = "Route ID is Required";
    }
    if (!value.arr_time) {
      errors.arr_time = "Arrival Time is Required";
    }
    if (!value.dept_time) {
      errors.dept_time = "Departure Time is Required";
    }
    if (!value.fare) {
      errors.fare = "Fare is Required";
    }
    if (!value.tickets_left) {
      errors.tickets_left = "Tickets Left is Required";
    }
    if (!value.aircraft_id) {
      errors.aircraft_id = "Aircraft ID is Required";
    }

    er = errors;
    updateErrors((e) => errors);
    return errors;
  };

  const putData = (event) => {
    const { name, value } = event.target;
    setSchedule({ ...schedule, [name]: value });
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
  const addCall = async () => {
    const dept_time = formatDateToISOString(
      new Date(schedule.Time_of_Departure)
    );
    const arr_time = formatDateToISOString(new Date(schedule.Time_of_Arrival));
    validation(schedule);
    if (Object.keys(er).length !== 0) {
      console.log(errors);
      return;
    }
    const response = await axios.put(`${API_URL}/add-schedule`, {
      dept_time,
      arr_time,
      route_id: schedule.route_id,
      fare: schedule.fare,
      tickets_left: schedule.tickets_left,
      aircraft_id: schedule.aircraft_id,
    });
    if (response.data.success === true) {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
      updateRefresh((ref) => !ref);
    } else {
      setServerMessage({
        error: false,
        msg: response.data.message,
      });
    }
  };

  return (
    <>
      {serverMessage && !serverMessage.error && (
        <div className="alert alert-success">{serverMessage.msg}</div>
      )}
      {serverMessage && serverMessage.error && (
        <div className="alert alert-warning">{serverMessage.msg}</div>
      )}
      <button
        type="button"
        class="btn btn-primary rounded-pill me-5 mt-5"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add Schedule
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
                        errors.aircraft_id ? " is-invalid" : ""
                      }`}
                      id="aircraft_id"
                      name="aircraft_id"
                      value={schedule.aircraft_id}
                      onChange={(event) => putData(event)}
                      type="text"
                      placeholder="Aircraft ID"
                    />
                    <label htmlFor="aircraft_id">Aircraft ID</label>
                    <p className="text-danger">
                      {errors.aircraft_id ? errors.aircraft_id : ""}
                    </p>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      className={`form-control${
                        errors.route_id ? " is-invalid" : ""
                      }`}
                      id="route_id"
                      name="route_id"
                      value={schedule.route_id}
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
                        errors.dept_time ? " is-invalid" : ""
                      }`}
                      id="dept_time"
                      name="dept_time"
                      onChange={(event) => putData(event)}
                      type="datetime-local"
                      value={schedule.dept_time}
                    />
                    <label htmlFor="dept_time">Departs At</label>
                    <p className="text-danger">
                      {errors.dept_time ? errors.dept_time : ""}
                    </p>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      className={`form-control${
                        errors.arr_time ? " is-invalid" : ""
                      }`}
                      id="arr_time"
                      name="arr_time"
                      onChange={(event) => putData(event)}
                      type="datetime-local"
                      value={schedule.arr_time}
                    />
                    <label htmlFor="arr_time">Arrives At</label>
                    <p className="text-danger">
                      {errors.arr_time ? errors.arr_time : ""}
                    </p>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      className={`form-control${
                        errors.fare ? " is-invalid" : ""
                      }`}
                      id="fare"
                      name="fare"
                      value={schedule.fare}
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
                      value={schedule.tickets_left}
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
                  addCall();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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
