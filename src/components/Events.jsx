 
import { Container, Row, Alert } from "react-bootstrap";
import Event from "./Event";
import { useEffect, useState } from "react";
 
import { useDispatch, useSelector } from "react-redux";
 import {deleteEventReducer, fetchEvents } from "../redux/slices/eventsSlice"
import { deleteEvent } from "../service/api";
function Events() {
 
  const [showalert, setShowalert] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const dispatch = useDispatch() ; 
 const  events= useSelector((d)=>d.events.events) ; 
  //state.nom du slice.nomde la variable
  
  
  useEffect(() => {
    dispatch(fetchEvents());
  } ,[dispatch]);

   
   

  const deleteE = async (eventId) => {
    await deleteEvent(eventId);
    dispatch(deleteEventReducer(eventId));
  };
  const showAlert = () => {
    setShowalert(true);
    setTimeout(() => {
      setShowalert(false);
    }, 5000);
  };

  useEffect(() => {
    setTimeout(() => {
      setWelcome(false)
    }, 3000);
  }, []);
  return (
    <>
    { welcome && (<Alert> Hey Welcome to Esprit Events</Alert>)}
    <Container style={{ marginTop: "30px" }}>
      <Row xs={1} md={4} className="g-4">
        {events.map((eventItem, index) => (
          <Event key={index} event={eventItem} showAlert={showAlert} deleteEvent={deleteE}/>
        ))}
      </Row>
      {showalert && <Alert> You have book an event </Alert>}
    </Container>
    </>
  );
}

export default Events;
