import React, { useState, useEffect, useRef } from "react";
import { Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types"; // Import PropTypes

const Editeaza = ({ item, onEditSubmit }) => {
  const ref = useRef();
  const [model, setModel] = useState(item.Model || "");
  const [pret, setPret] = useState(item.Pret || "");
  const [Imagine, setImagine] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setModel(item.Model || "");
    setPret(item.Pret || "");
    setImagine(null);
    ref.current.value = "";
  }, [item]);

  const tratezSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Model", model);
      formData.append("Pret", pret);
      formData.append("Imagine", Imagine);

      const response = await fetch("https://zh4hwg-5050.csb.app/editeaza/${item.id}", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          Model: model,
          Pret: pret,
          Imagine: Imagine,
        }),
      });

      // Pass the edited data to the parent component
      onEditSubmit(await response.json());
    } catch (error) {
      console.error("Error editing car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFisierImagine = (e) => {
    const file = e.target.files[0];
    setImagine(file);
  };

  const stil = {
    marginTop: "2rem",
    backgroundColor: "#ddd",
    padding: "20px",
    width: "750px",
  };

  return (
    <div>
      <p>.</p>
      <Container style={stil} className="mt-5">
        <Form onSubmit={tratezSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Model:</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              name="Imagine"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

Editeaza.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    Model: PropTypes.string,
    Pret: PropTypes.string,
  }),
  onEditSubmit: PropTypes.func.isRequired,
};

export default Editeaza;
