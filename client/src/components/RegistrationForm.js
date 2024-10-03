import React, { useState } from "react";

const RegistrationForm = ({ userId, onRegister, onCancel }) => {
  const [eventId, setEventId] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3003/registrations/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ticket_type: ticketType, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to register for the event");
      }

      const result = await response.json();
      alert(result.message);
      onRegister(); // Refresh the registered events list
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/registrations/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel registration");
      }

      const result = await response.json();
      alert(result.message);
      onCancel(); // Refresh the registered events list
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register for an Event</h2>

    </div>
  );
};

export default RegistrationForm;