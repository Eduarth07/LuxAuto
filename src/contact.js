import React from "react";
import "./styles.css";
import { Container, Card, Row, Col } from "react-bootstrap";

const Contact = () => {
  return (
    <div>
      <p className="mb-5">.</p>
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-center">
          <h3>Contact</h3>
        </Card.Header>
      </Card>
      <Container className="mt-5 border rounded shadow-lg">
        <Row>
          <Col sm={12} md={6}>
            <h3 className="mt-2">Showroom Cluj-Napoca</h3>
            <p>Blvd. Nicolae Titulescu nr. 16</p>
            <p>0748 48 44 44</p>
            <p>vanzaricluj@luxauto.ro</p>
          </Col>
          <Col sm={12} md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5465.281498786611!2d23.598883830143958!3d46.77197727091412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1707495540084!5m2!1sro!2sro"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Contact;
