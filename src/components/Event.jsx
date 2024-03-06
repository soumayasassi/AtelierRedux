import { Button } from "react-bootstrap";
import viteLogo from "/vite.svg";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editEvent } from "../service/api";
import { increment } from "../redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";
function Event(props) {
  const dispatch = useDispatch() ; 
  const [event, setEvent] = useState(props.event);
  const handleBuy = () => {
    props.showAlert();
    setEvent((prev) => ({
      ...prev,
      nbParticipants: prev.nbParticipants + 1,
      nbTickets: prev.nbTickets - 1,
    }));
  };
  const handleLike = () => {
    setEvent((prev) => ({
      ...prev,
      like: !prev.like,
    }));
  };

  const addToWishlist = (event) => {
    dispatch(increment(event));
  };
  useEffect(() => {
    updateEvent();
  }, [event.like]);

  useEffect(() => {
    updateEvent();
  }, [event.nbTickets]);

  const updateEvent = async () => {
    await editEvent(event.id, event);
  };

  return (
    <Col style={{ width: "20%", margin: "10px" }} className="m-2">
      <Card>
        <Card.Img
          variant="top"
          src={`/images/${event.nbTickets ? event.img : "sold_out.png"}`}
        />

        <Card.Body>
          <Card.Title>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
          </Card.Title>
          <Card.Text>Price : {event.price}</Card.Text>
          <Card.Text>Number of tickets : {event.nbTickets}</Card.Text>
          <Card.Text>Number of participants : {event.nbParticipants}</Card.Text>
          <Button onClick={handleLike}>
            {event.like ? "Dislike" : "Like"}
          </Button>
          <Button
            variant="primary"
            onClick={handleBuy}
            disabled={event.nbTickets ? false : true}
          >
            Book Event
          </Button>
          <Button variant="success">
            <Link
              to={`/events/update/${event.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Update
            </Link>
          </Button>
          <Button variant="danger" onClick={() => props.deleteEvent(event.id)}>
            Delete
          </Button>
          <Button variant="success" onClick={() => addToWishlist(event)}>
           Add to WishList +
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Event;
