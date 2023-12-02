import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Cancel = () => {
  const navigate = useNavigate();
  const [data, updateData] = useState({
    firstName: "",
    lastName: "",
    pnr: "",
  });
  const [errors, updateErrors] = useState({});
  const [cancel, updateCancel] = useState(false);
  const [reschedule, updateReschedule] = useState(false);
  const [serverMessage, setServerMessage] = useState({
    error: false,
    success: false,
    msg: "",
  });
  const [valid, setValid] = useState(false);
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
    if (!value.firstName || value.firstName.length < 1) {
      errors.firstName = "First Name is Required";
    }
    if (!value.lastName || value.lastName.length < 1) {
      errors.lastName = "Last Name is Required";
    }
    if (!value.pnr) {
      errors.pnr = "Booking ID is Required";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && valid) {
      if (cancel) {
        cancelServerCall({
          booking_id: data.pnr,
          user_name: data.firstName + " " + data.lastName,
        }).then((data) => {
          if (data.success) {
            setServerMessage({ error: true, msg: data?.message });
          } else {
            setServerMessage({ error: true, msg: data?.message });
          }
        });
        navigate("/bookflight");
      } else if (reschedule) {
        cancelServerCall({
          booking_id: data.pnr,
          user_name: data.firstName + " " + data.lastName,
        }).then((data) => {
          if (data.success) {
            setServerMessage({ error: true, msg: data?.message });
          } else {
            setServerMessage({ error: true, msg: data?.message });
          }
        });
        navigate("/bookflight");
      }
    }
  }, [errors, valid, data]);
  const cancelServerCall = async (data) => {
    const response = await axios.post(`${API_URL}/cancel-booking`, data);
    return response.data;
  };

  return (
    <>
      <div className="mx-auto my-5 p-5 wd-signup-container">
        {serverMessage.error && (
          <div className="alert alert-warning">{serverMessage.msg}</div>
        )}
        {serverMessage.success && (
          <div className="alert alert-success">{serverMessage.msg}</div>
        )}
        <form>
          <div className="row">
            <div className="col-4">
              <input
                className={`form-control${
                  errors.firstName ? " is-invalid" : ""
                }`}
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={(event) => putData(event)}
                type="text"
                placeholder="First Name"
              />
              <p className="text-danger">
                {errors.firstName ? errors.firstName : ""}
              </p>
            </div>
            <div className="col-4">
              <input
                className={`form-control${
                  errors.lastName ? " is-invalid" : ""
                }`}
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={(event) => putData(event)}
                type="text"
                placeholder="Last Name"
              />
              <p className="text-danger">
                {errors.lastName ? errors.lastName : ""}
              </p>
            </div>
            <div className="col-4">
              <input
                className={`form-control${errors.pnr ? " is-invalid" : ""}`}
                id="pnr"
                name="pnr"
                value={data.pnr}
                onChange={(event) => putData(event)}
                type="text"
                placeholder="Booking ID"
              />
              <p className="text-danger">{errors.pnr ? errors.pnr : ""}</p>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-primary rounded-pill "
            onClick={(event) => {
              updateReschedule(true);
              dataSubmit(event);
            }}
          >
            Reschedule
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-danger rounded-pill "
            onClick={(event) => {
              updateCancel(true);
              dataSubmit(event);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
export default Cancel;
