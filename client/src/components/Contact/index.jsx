import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

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
      <h1>CONTACT US</h1>
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

    input, textarea {
      width: 100%;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-height: 100px;
      min-height: 100px;
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);

      color: orange;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px); 
      padding: 10px 20px;
      border-radius: 15px;
      transition: all 0.3s ease;
      font-weight: bold;
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;