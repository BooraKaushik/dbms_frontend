import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import SignupAction from "../Actions/SignupAction";

const SignupComponent = () => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const navigate = useNavigate();
  const [data, updateData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      addressLine: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    phone: "",
    type: "Customer",
    agreed: false,
  });
  const [errors, updateErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ error: false, msg: "" });
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && valid) {
      SignupAction(data).then((data) => {
        if (data.success) {
          navigate("/login");
        } else {
          setServerMessage({ error: true, msg: data?.message });
        }
      });
    }
  }, [errors, navigate, valid, data]);

  const validation = (value) => {
    const errors = {};
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexpPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,20}$/;
    const regexpPhone =
      /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!value.firstName) {
      errors.firstName = "First Name is Required";
    }
    if (!value.lastName) {
      errors.lastName = "Last Name is Required";
    }
    if (!value.dateOfBirth) {
      errors.dateOfBirth = "date is Required";
    }
    if (!value.email) {
      errors.email = "Email is Required";
    } else if (!regexp.test(value.email)) {
      errors.email = "Email is Not Valid";
    }
    if (!value.password) {
      errors.password = "Password is Required";
    } else if (value.password.length < 4) {
      errors.password = "Password length has to be atleast 4 Characters";
    } else if (value.password.length > 20) {
      errors.password = "Password length should not exceed 20 Characters";
    } else if (value.lastName && value.password.includes(value.lastName)) {
      errors.password = "Password should not contain your Last Name";
    } else if (!regexpPassword.test(value.password)) {
      errors.password =
        "Password should contain atleast one lowercase character, uppercase character, digit and Symbol";
    }
    if (!value.confirmPassword) {
      errors.confirmPassword = "Confirm Password is mandatory";
    } else if (value.confirmPassword !== value.password) {
      errors.confirmPassword = "Password did not match!";
    }
    if (!value.phone) {
      errors.phone = "Phone Number is Required";
    } else if (!regexpPhone.test(value.phone)) {
      errors.phone = "Phone Number is invalid";
    }
    return errors;
  };
  return (
    <div className="mx-auto my-5 p-5 wd-signup-container">
      <div className="wd-form-signup-text">
        <h3>SIGN UP</h3>
      </div>
      {serverMessage.error && (
        <div className="alert alert-warning">{serverMessage.msg}</div>
      )}
      <form>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="form-floating mt-3">
              <input
                type="text"
                className={`form-control${
                  errors.firstName ? " is-invalid" : ""
                }`}
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={(event) => putData(event)}
              />
              <label htmlFor="firstName">First Name</label>
              <p className="text-danger">
                {errors.firstName ? errors.firstName : ""}
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-floating mt-3">
              <input
                type="text"
                className={`form-control${
                  errors.lastName ? " is-invalid" : ""
                }`}
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={(event) => putData(event)}
              />
              <label htmlFor="lastName">Last Name</label>
              <p className="text-danger">
                {errors.lastName ? errors.lastName : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="form-floating my-3">
          <input
            type="date"
            className={`form-control${errors.dateOfBirth ? " is-invalid" : ""}`}
            id="dateOfBirth"
            name="dateOfBirth"
            max={new Date().toISOString().split("T")[0]}
            value={data.dateOfBirth}
            onChange={(event) => putData(event)}
          />
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <p className="text-danger">
            {errors.dateOfBirth ? errors.dateOfBirth : ""}
          </p>
        </div>
        <div className="form-floating my-3">
          <input
            type="email"
            className={`form-control${errors.email ? " is-invalid" : ""}`}
            id="Email"
            name="email"
            value={data.email}
            onChange={(event) => putData(event)}
          />
          <label htmlFor="Email">Email</label>
          <p className="text-danger">{errors.email ? errors.email : ""}</p>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-floating my-3">
              <input
                type="password"
                className={`form-control${
                  errors.password ? " is-invalid" : ""
                }`}
                id="Password"
                name="password"
                value={data.password}
                onChange={(event) => putData(event)}
              />
              <label htmlFor="Password">Password</label>
              <p className="text-danger">
                {errors.password ? errors.password : ""}
              </p>
            </div>
            <div className="form-floating my-3">
              <input
                type="password"
                className={`form-control${
                  errors.confirmPassword ? " is-invalid" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(event) => putData(event)}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <p className="text-danger">
                {errors.confirmPassword ? errors.confirmPassword : ""}
              </p>
            </div>
          </div>
          <div className="col-sm-6 my-auto">
            <ul>
              <li>Password should not contain your last name.</li>
              <li>Password should have atleast 4 characters.</li>
              <li>Password must not exceed 20 characters.</li>
              <li>
                Password must have atleast one lowercase character, uppercase
                character, digit and Symbol.
              </li>
            </ul>
          </div>
        </div>

        <div className="form-floating my-3">
          <input
            type="text"
            className={`form-control${errors.phone ? " is-invalid" : ""}`}
            id="phone"
            name="phone"
            value={data.phone}
            onChange={(event) => putData(event)}
          />
          <label htmlFor="phone">Phone</label>
          <p className="text-danger">{errors.phone ? errors.phone : ""}</p>
        </div>

        <div>
          <button
            className="btn btn-primary rounded-pill w-100 p-2"
            onClick={(event) => dataSubmit(event)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupComponent;
