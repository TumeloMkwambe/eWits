import React, { useState } from "react";
import Modal from "react-modal";

const BuyTicketModal = ({ isOpen, onRequestClose, eventId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numTickets, setNumTickets] = useState("");
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!numTickets) newErrors.numTickets = "Quantity is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed to payment gateway
      console.log("Proceeding to payment...");
      // Add your payment logic here
      onRequestClose(); // Close modal
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Buy Ticket for Event ID: {eventId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={numTickets}
            min="1"
            onChange={(e) => setNumTickets(e.target.value)}
          />
          {errors.numTickets && <p style={{ color: "red" }}>{errors.numTickets}</p>}
        </div>
        <button type="submit">Proceed to payment</button>
      </form>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default BuyTicketModal;