import React from "react";
import AppointmentList from "../components/AppointmentList";
import MapComponentAppointments from "../components/MapComponentAppointments";

const Appointments = () => {
  return (
    <div>
      <AppointmentList />
      <MapComponentAppointments />
    </div>
  );
};

export default Appointments;
