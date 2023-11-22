import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS } from "../../utils/queries";
import AuthService from "../../utils/auth.js";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

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
    <StyledAppointmentList>
      <h2>Appointments</h2>
      <StyledList>
        {data.appointments.map((appointment) => (
          <StyledListItem key={appointment.id}>
            <strong>
              {appointment.date} {appointment.time}
            </strong>{" "}
            - User: {appointment.user.username} - Walker: {appointment.walker.username} - Dog: {appointment.petProfile.petName}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledAppointmentList>
  );
};

export default AppointmentList;

// Styles
const StyledAppointmentList = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
`;