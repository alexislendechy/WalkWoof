import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../../utils/queries";
import AuthService from "../../utils/auth.js";
import jwt_decode from "jwt-decode";

const AppointmentList = () => {
  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  console.log("Decoded Token:", decodedToken);

  const userId = AuthService.getUserId();
  console.log("UserId:", userId);
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS, {
    variables: { id: userId },
  });
  console.log("Data:", data);

  if (loading) return "Loading...";
  if (error) return `Error loading appointments! ${error.message}`;

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {data.appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>
              {appointment.date} {appointment.time}
            </strong>{" "}
            - User: {appointment.user.username} - Walker: {appointment.walker.username} - Dog: {appointment.petProfile.petName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
