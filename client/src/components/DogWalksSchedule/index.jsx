import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_DOG_WALK } from "../../utils/mutations";
import Auth from "../../utils/auth";



const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
display: inline-block;
height: 50px;
margin: 10px;
padding: 10px 20px;
border-radius: 15px;
color: white;
background: rgba(97, 76, 127, 0.6); 
border: 2px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 0 10px rgba(97, 76, 127, 0.5); 
backdrop-filter: blur(4px);
-webkit-backdrop-filter: blur(4px);
transition: all 0.3s ease;
font-weight: bold;
&:hover {
  background: rgba(97, 76, 127, 0.8); 
}
text-decoration: none;
`;

const DropdownContent = styled.div`
  display: ${props => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  margin-top: -5px;
  left: 50%; 
  transform: translateX(-50%); 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%; 
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 0.5em;
`;

const Button = styled.button`
background: rgba(97, 76, 127, 0.6); 
border: 2px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 0 10px rgba(97, 76, 127, 0.5);
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 1.2em; // Increase the font size
  border-radius: 5px; // Add some border radius
`;
const AddDogWalk = ({ id }) => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const [addDogWalk] = useMutation(ADD_DOG_WALK);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log("Date changed:", newDate); // Log the new date
    console.log("User ID:", id); 
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
      <Label htmlFor="date">Date:</Label>
      <Input id="date" type="date" value={date} onChange={handleDateChange} />
      <Label htmlFor="hour">Hour:</Label>
      <Input id="hour" type="time" value={hour} onChange={handleHourChange} />
      <Button type="submit">Schedule Walk</Button>
    </Form>
  );
};

// Dropdown component
const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track whether the dropdown is open

  const toggleOpen = () => setIsOpen(!isOpen); // Function to toggle the dropdown

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleOpen}>{title}</DropdownButton>
      <DropdownContent open={isOpen}>{children}</DropdownContent> 
    </DropdownContainer>
  );
};

// NavigationBar component
const ScheduleWalk = () => {
  const token = Auth.getToken();
  const profile = Auth.getProfile();
  const id = profile.authenticatedPerson._id; // Retrieve the user ID
 // console.log("Token:", token); // Debug log - render
  return (
    
      <Dropdown title="Schedule Dog Walk">
        <AddDogWalk id={id} />
      </Dropdown>
    
  );
};

export default ScheduleWalk;
