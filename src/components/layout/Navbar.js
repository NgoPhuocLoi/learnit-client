import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";

function NavbarMenu() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(authContext);

  const handleLogout = () => logoutUser();
  return (
    <Navbar expand="lg" bg="success" variant="dark" className="shadow p-2">
      <Navbar.Brand className="fw-bolder text-white ms-2">
        <img
          src={learnItLogo}
          alt="img"
          width="32"
          height="32"
          className="me-2"
        />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="fw-bolder text-white" to="/dashboard" as={Link}>
            DashBoard
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav className="me-2">
          <Nav.Link className="fw-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="danger"
            className="fw-bolder text-white"
            onClick={handleLogout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="me-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
