import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { addEventReducer } from "../redux/slices/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../service/api";
function AddEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newevent, setNewEvent] = useState({
    name: "",
    description: "",
    img: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false,
  });

  const handleChange = (e) => {
    setNewEvent({ ...newevent, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setNewEvent({ ...newevent, [e.target.name]: e.target.files[0].name });
  };

  const handleSubmit = async () => {
    const eventResult = await addEvent(newevent);
    dispatch(addEventReducer(eventResult.data));
    if (eventResult.status === 201) {
      navigate("/events");
    }
  };
  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Add a new Event to your Event List</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter a Name"
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            value={newevent.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newevent.description}
            placeholder="Enter description "
            name="description"
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newevent.price}
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={newevent.nbTickets}
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Participants</Form.Label>
          <Form.Control
            type="number"
            name="nbParticipants"
            value={newevent.nbParticipants}
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            style={{
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
            onChange={(e) => handleFile(e)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Add an Event
        </Button>

        <Button variant="btn btn-secondary" type="reset">
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default AddEvent;
