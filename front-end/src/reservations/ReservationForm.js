import React, { useEffect, useState } from "react";

// import utility functions
import { formatAsTime } from "../utils/date-time";

function ReservationForm({
  onCancel,
  submitHandler,
  submitLabel,
  cancelLabel,
  initialState,
  error,
}) {
  const [reservationData, setReservationData] = useState({ ...initialState });

  const handleReservationUpdate = (event) => {
    const { name, value } = event.target;
    if (name === "mobile_number") {
      // Automatically insert dashes for the phone number
      const onlyNums = value.replace(/[^\d]/g, '');
      let newValue = onlyNums;
      if (onlyNums.length > 3 && onlyNums.length <= 6) {
        newValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      } else if (onlyNums.length > 6) {
        newValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
      }
      setReservationData({
        ...reservationData,
        [name]: newValue,
      });
    } else if (name === "people") {
      setReservationData({
        ...reservationData,
        [name]: Number(value),
      });
    } else {
      setReservationData({
        ...reservationData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    setReservationData(initialState);
  }, [initialState]);

  const onSubmit = (event) => {
    event.preventDefault();
    const formattedTime = formatAsTime(reservationData.reservation_time);
    submitHandler({ ...reservationData, reservation_time: formattedTime });
    if (!error) {
      setReservationData({ ...initialState });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Other input fields */}
      <label htmlFor="mobile_number">
        Mobile Number:
        <input
          className="form-control"
          name="mobile_number"
          id="mobile_number"
          type="text" // Changed from number to text
          required={true}
          value={reservationData.mobile_number || ""}
          placeholder="Mobile Number"
          onChange={handleReservationUpdate}
        />
      </label>
      <br />
      {/* Other input fields */}
      <div>
        <button
          type="button"
          className="btn btn-outline-danger mr-2"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
        <button type="submit" className="btn btn-outline-success">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
