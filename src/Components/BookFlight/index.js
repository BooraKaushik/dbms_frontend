import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const BookFlight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const [data, updateData] = useState({
    src: "",
    dst: "",
    date: getCurrentDate(),
  });
  const [errors, updateErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ error: false, msg: "" });
  const [valid, setValid] = useState(false);
  const [flights, setFlights] = useState();
  const putData = (event) => {
    const { name, value } = event.target;
    updateData({ ...data, [name]: value });
  };
  const dataSubmit = (event) => {
    event.preventDefault();
    updateErrors(validation(data));
    setValid(true);
  };
  const validation = (value) => {
    const errors = {};
    if (!value.src || value.src.length < 1) {
      errors.src = "Source is Required";
    }
    if (!value.dst || value.dst.length < 1) {
      errors.dst = "Destination is Required";
    }
    if (!value.date) {
      errors.date = "date is Required";
    }
    return errors;
  };

  useEffect(() => {
    console.log("called" + valid);
    if (Object.keys(errors).length === 0 && valid) {
      getDataAction(data).then((data) => {
        if (data.success) {
          setFlights(data.flights);
        } else {
          setServerMessage({ error: true, msg: data?.message });
        }
      });
    }
  }, [errors, valid, data]);
  const getDataAction = async (data) => {
    const response = await axios.post(`${API_URL}/flights`, data);
    return response.data;
  };

  return (
    <>
      <div className="mx-auto my-5 p-5 wd-signup-container">
        {serverMessage.error && (
          <div className="alert alert-warning">{serverMessage.msg}</div>
        )}
        <form>
          <div className="row">
            <div className="col-3">
              <input
                className={`form-control${
                  errors.firstName ? " is-invalid" : ""
                }`}
                id="src"
                name="src"
                value={data.src}
                onChange={(event) => putData(event)}
                type="text"
                placeholder="Source"
              />
              <p className="text-danger">{errors.src ? errors.src : ""}</p>
            </div>
            <div className="col-3">
              <input
                className={`form-control${
                  errors.firstName ? " is-invalid" : ""
                }`}
                id="dst"
                name="dst"
                value={data.dst}
                onChange={(event) => putData(event)}
                type="text"
                placeholder="Destination"
              />
              <p className="text-danger">{errors.dst ? errors.dst : ""}</p>
            </div>
            <div className="col-3">
              <input
                className={`form-control${
                  errors.firstName ? " is-invalid" : ""
                }`}
                id="date"
                name="date"
                onChange={(event) => putData(event)}
                type="date"
                value={data.date}
              />
              <p className="text-danger">{errors.date ? errors.date : ""}</p>
            </div>
            <div className="col-3">
              <button
                className="btn btn-primary rounded-pill w-100 p-2"
                onClick={(event) => dataSubmit(event)}
              >
                Search
              </button>
            </div>
          </div>
        </form>
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
            <div className="col-2">
              <h5>Route Id</h5>
            </div>
            <div className="col-2">
              <h5>Schedule ID</h5>
            </div>
            <div className="col-2">
              <h5>Arives At</h5>
            </div>
            <div className="col-2">
              <h5>Departs At</h5>
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
                <div className="col-2  d-flex align-items-center justify-content-center">
                  {flight.route_id}
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  {flight.schedule_id}
                </div>
                <div className="col-2  d-flex align-items-center justify-content-center">
                  {new Date(flight.Time_of_Arrival).getHours() +
                    ":" +
                    (new Date(flight.Time_of_Arrival).getMinutes() < 10
                      ? "0" + new Date(flight.Time_of_Arrival).getMinutes()
                      : new Date(flight.Time_of_Arrival).getMinutes())}
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
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
                        type: "UPDATE",
                        transfer: flight,
                      });
                      navigate(`/book/${flight.schedule_id}`);
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
export default BookFlight;
