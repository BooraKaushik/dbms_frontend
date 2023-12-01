import { useEffect, useState } from "react";
import { API_URL } from "../Services/SignUpService";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { html2pdf } from "html2pdf.js";

const Details = () => {
  const navigate = useNavigate();
  const flight = useSelector((state) => state.Details);
  const [start, setStart] = useState(true);
  const [serverMessage, setServerMessage] = useState();

  useEffect(() => {
    if (start) {
      setStart(false);
      if (flight.dataPresent || !localStorage.getItem("USER_EMAIL")) {
        navigate("/bookflight");
      }
    }
  }, []);
  const getDate = (today) => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const serverCall = async () => {
    const response = await axios.get(`${API_URL}/book-flight`, {
      schedule_id: flight.schedule_id,
      user_email: localStorage.getItem("USER_EMAIL"),
    });
    if (response.data.success === true) {
      setServerMessage(
        response.data.message +
          '  "BOOKING ID:   ' +
          response.data.booking_id +
          '"'
      );
      if (response.data.success) {
        printPageAsPDF();
      }
    }
  };
  const printPageAsPDF = () => {
    const element = document.getElementById("pdf-container");

    if (!element) {
      console.error("PDF container element not found.");
      return;
    }

    const pdfOptions = {
      margin: 10,
      filename: "booking_details.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(pdfOptions).outputPdf();
  };
  return (
    <>
      {serverMessage && (
        <div className="alert alert-success">{serverMessage}</div>
      )}
      <div className="mx-auto my-5 p-5 wd-signup-container">
        <div className="row">
          <div className="col-6 d-flex ps-5">User Email:</div>
          <div className="col-6 d-flex ps-5">
            {localStorage.getItem("USER_EMAIL")}
          </div>
        </div>
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
      </div>
      <div>
        <button
          className="btn btn-primary rounded-pill m-auto"
          onClick={() => serverCall()}
        >
          Book
        </button>
      </div>
    </>
  );
};
export default Details;
