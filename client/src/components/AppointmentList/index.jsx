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
        {data && data.getAllAppointments ? (
          data.getAllAppointments.map((appointment) => (
            <StyledListItem key={appointment.id}>
              <strong>
                {appointment.date} {appointment.time}
              </strong>{" "}
              - User: {appointment.user} - Address: {appointment.address} - Dog:{" "}
              {appointment.petProfile}
            </StyledListItem>
          ))
        ) : (
          <StyledListItem>No appointments found</StyledListItem>
        )}
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
  margin-bottom: 30px; 
  padding: 20px;
  border-radius: 5px;
  overflow-wrap: break-word; 
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 15px 15px 40px rgba(255, 165, 0, 0.7); 
`;