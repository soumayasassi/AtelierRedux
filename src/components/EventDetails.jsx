import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getallEvents } from "../service/api";
 

export default function EventDetails() {
  const   {id }  = useParams();
  /*const param = useParams() ; 
  param.id*/
  //const event = events.find((evt) => evt.id == id);
 const [event, setEvent]  = useState({})

  useEffect(() => {
    fetchone() ; 
   }, []);
 
   const fetchone = async () => 
   {
     const response = await getallEvents(id) 
    setEvent(response.data ) ; 
    
     console.log(event)
   }
  return (
    <>
   
    {event.id === undefined ? <Alert> Event does not exist </Alert>  : 
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`/images/${event.img}`}
            alt="Product Img"
            height="300"
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <h1>{event.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Description</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: "50px" }}>{event.description}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Price</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: "50px" }}>{event.price} DT</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>  }
    </>
  );
}