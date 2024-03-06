import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { editEvent, getallEvents } from "../service/api";
import { useDispatch } from "react-redux";
import { updateEventReducer } from "../redux/slices/eventsSlice";

export default function UpdateEvent() {
  const navigate = useNavigate();
  const param = useParams();
  const [eventItem, setEventItem] = useState({
    name: "",
    description: "",
    img: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventResult = await getallEvents(param.id);
      setEventItem(eventResult.data);
    };
    fetchEvent();
  }, []);

  const onValueChange = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.value });
  };
  const onFileHandle = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.files[0].name });
  };

  const updateEvent = async () => {
    const eventResult = await editEvent(param.id, eventItem);
    dispatch(updateEventReducer(eventResult.data));
    if (eventResult.status === 200) {
      navigate("/events");
    }
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Modify {eventItem.name}</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            name="name"
            value={eventItem.name}
            type="text"
            placeholder="Enter a Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description "
            onChange={(e) => onValueChange(e)}
            name="description"
            value={eventItem.description}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => onValueChange(e)}
            name="price"
            value={eventItem.price}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => onValueChange(e)}
            name="nbTickets"
            value={eventItem.nbTickets}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => onFileHandle(e)}
            name="img"
          />
        </Form.Group>
        <Button variant="primary" onClick={updateEvent}>
          Update
        </Button>
        <Button onClick={() => navigate("/events")} variant="secondary">
          Cancel
        </Button>
      </Form>
    </Container>
  );
}