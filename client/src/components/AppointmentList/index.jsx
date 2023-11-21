import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPOINTMENTS } from '../../utils/queries';

const AppointmentList = () => {
    const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);

    if (loading) return 'Loading...';
    if (error) return `Error loading appointments! ${error.message}`;

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {data.appointments.map((appointment) => (
                    <li key={appointment.id}>
                        <strong>{appointment.date} {appointment.time}</strong> - {appointment.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
