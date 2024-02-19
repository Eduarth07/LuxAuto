import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Navi = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateOpacity = () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const opacity = 1 - scrollPosition / maxScroll;
    // Limit opacity to a minimum value (e.g., 0.5)
    return Math.max(0.5, opacity);
  };

  return (
    <div>
      <Navbar
        fixed="top"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${calculateOpacity()})`,
        }}
        data-bs-theme="dark"
        expand="sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            LuxAuto
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Marci" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/marca/BMW">
                  BMW
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/marca/Mercedes">
                  Mercedes
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/marca/Audi">
                  Audi
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/marca/Jaguar">
                  Jaguar
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/adaug">
                Adauga
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={handleModalOpen}>Autentificare</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Autentificare */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Autentificare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your authentication form components here */}
          <Form>
            {/* Example form fields */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Utilizator:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Parola:</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Autentificare
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Închide
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Cont nou
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navi;
