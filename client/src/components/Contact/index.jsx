import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Link } from 'react-router-dom';

// npm i @emailjs/browser

export function Contact () {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate form fields
    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    emailjs
      .sendForm(
        "service_vt9k5nj",
        "template_y5eev36",
        form.current,
        "bqhNkbhbj__qxyL-t"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent successfully");
          alert("Message sent successfully. We'll answer directly to your email shortly");        
        },
        (error) => {
          console.log(error.text);
          alert("Error sending message. Please try again later.");
        }
      );
  };

  return (
    <StyledContactForm>
      <Link to="/contact">← Go to Signup</Link>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required/>
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  );
}

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;