import React, { useState, useRef } from "react";
import {
  Form,
  Container,
  Button,
  Card,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import left from "./left.png";
import right from "./right.png";
import "./styles.css";

const Adaug = () => {
  const ref = useRef();
  const [model, setModel] = useState("");
  const [pret, setPret] = useState("");
  const [marca, setMarca] = useState("");
  const [an, setAn] = useState("");
  const [detalii, setDetalii] = useState("");
  const [km, setKm] = useState("");
  const [Imagine, setImagine] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tratezSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Marca", marca);
      formData.append("An", an);
      formData.append("Detalii", detalii);
      formData.append("Km", km);
      formData.append("Model", model);
      formData.append("Pret", pret);
      formData.append("Imagine", Imagine);

      const response = await fetch("https://zh4hwg-5050.csb.app/adauga", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server response:", result);
      navigate("/");
      // Reset the form fields
      setModel("");
      setPret("");
      setMarca("");
      setAn("");
      setDetalii("");
      setKm("");
      setImagine(null);
      ref.current.value = "";
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const handleFisierImagine = (e) => {
    const file = e.target.files[0];
    setImagine(file);
  };

  const stil = {
    marginTop: "5rem",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "20px",
    width: "750px",
    zIndex: 2,
  };

  return (
    <div>
      <p className="mb-5">.</p>
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-center ">
          <h3>Adaugă un anunț</h3>
        </Card.Header>
      </Card>
      <Row>
        <Col
          md={4}
          className="d-flex align-items-center image-column"
          style={{ zIndex: 1 }}
        >
          <Image src={left} fluid />;
        </Col>
        <Col
          md={4}
          className="container-center d-flex align-items-center justify-content-center"
        >
          <Container style={stil} className="mt-3 shadow-lg border">
            <Form onSubmit={tratezSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model:</Form.Label>
                <Form.Control
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>An:</Form.Label>
                <Form.Control
                  type="text"
                  value={an}
                  onChange={(e) => setAn(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Km:</Form.Label>
                <Form.Control
                  type="text"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Detalii:</Form.Label>
                <Form.Control
                  type="text"
                  value={detalii}
                  onChange={(e) => setDetalii(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pret:</Form.Label>
                <Form.Control
                  type="text"
                  value={pret}
                  onChange={(e) => setPret(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Imagine (maximum 1MB):</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleFisierImagine(e)}
                  ref={ref}
                  name="Imagine" // Set the name attribute to match the FormData key
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Container>
        </Col>
        <Col
          md={4}
          className="d-flex align-items-center image-column"
          style={{ zIndex: 1 }}
        >
          <Image src={right} fluid />;
        </Col>
      </Row>
    </div>
  );
};

export default Adaug;
