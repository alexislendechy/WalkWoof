import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_DOG_WALK } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px; /* Increased minimum width */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px; /* Add padding for content */

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%; /* Ensure input takes full width of the dropdown */
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const AddDogWalk = ({ id }) => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const [addDogWalk] = useMutation(ADD_DOG_WALK);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log("Date changed:", newDate); // Log the new date
    console.log("User ID:", id); // THIS IS UNDEFINED ON CHANGE
    setDate(newDate);
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    console.log("Hour changed:", newHour); // Log the new hour
    setHour(newHour);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && hour && id) {
      try {
        await addDogWalk({ variables: { id, date, hour } });
        setDate("");
        setHour("");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Missing information for scheduling dog walk");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="date" value={date} onChange={handleDateChange} />
      <Input type="time" value={hour} onChange={handleHourChange} />
      <Button type="submit">Schedule Walk</Button>
    </Form>
  );
};

// Dropdown component
const Dropdown = ({ title, children }) => (
  <DropdownContainer>
    <DropdownButton>{title}</DropdownButton>
    <DropdownContent>{children}</DropdownContent>
  </DropdownContainer>
);

// NavigationBar component
const NavigationBar = () => {
  const token = Auth.getToken();
  const profile = Auth.getProfile();
  const id = profile.authenticatedPerson._id; // Retrieve the user ID
  console.log("Token:", id); // Debug log - render
  return (
    <Navbar>
      <Dropdown title="Schedule Dog Walk">
        <AddDogWalk id={id} />
      </Dropdown>
    </Navbar>
  );
};

export default NavigationBar;
