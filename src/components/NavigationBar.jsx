import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCountAll } from "../redux/slices/wishlistSlice";

export default function NavigationBar() {
  const wishlistCounter = useSelector(selectCountAll);
  const active = {
    textDecoration: "none",
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>MyEvents</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to="events"
            style={({ isActive }) => (!isActive ? active : undefined)}
          >
            Events
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/events/add"
            style={({ isActive }) => (!isActive ? active : undefined)}
          >
            Add New Event
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/wishlist"
            style={({ isActive }) => ({
              textDecoration: isActive && "underline",
            })}
          >
            Wishlist ({wishlistCounter})
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}