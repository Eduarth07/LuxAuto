import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

const DetaliiAuto = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [model, setModel] = useState("");
  const [pret, setPret] = useState("");
  const [an, setAn] = useState("");
  const [marca, setMarca] = useState("");
  const [detalii, setDetalii] = useState("");
  const [km, setKm] = useState("");
  const [Imagine, setImagine] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [scrollToForm, setScrollToForm] = useState(false);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const response = await fetch(`http://localhost:5050/masini/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataFromFirebase = await response.json();
        setItem(dataFromFirebase);
        setModel(dataFromFirebase.Model || "");
        setPret(dataFromFirebase.Pret || "");
        setMarca(dataFromFirebase.Marca || "");
        setAn(dataFromFirebase.An || "");
        setKm(dataFromFirebase.Km || "");
        setDetalii(dataFromFirebase.Detalii || "");
        setImagine(dataFromFirebase.Imagine || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirebase();
  }, [id]);

  const handleBackToList = () => {
    navigate("/");
  };
  useEffect(() => {
    if (scrollToForm) {
      const formContainer = document.getElementById("editFormContainer");
      if (formContainer) {
        const topOffset =
          formContainer.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
      setScrollToForm(false); // Reset the state after scrolling
    }
  }, [scrollToForm]);
  const handleEditClick = () => {
    setEditing(true);
    setScrollToForm(true);
  };

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Model", model);
      formData.append("Pret", pret);
      formData.append("An", an);
      formData.append("Km", km);
      formData.append("Marca", marca);
      formData.append("Detalii", detalii);
      formData.append("Imagine", Imagine);

      const response = await fetch(`https://zh4hwg-5050.csb.app/editez/${id}`, {
        method: "PATCH",
        body: formData,
      });

      // Pass the edited data to the parent component
      console.log("Edited Data:", await response.json());

      // Refresh the data by calling fetchDataFromFirebase
      const fetchDataFromFirebase = async () => {
        try {
          const response = await fetch(`http://localhost:5050/masini/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const dataFromFirebase = await response.json();
          setItem(dataFromFirebase);
          setModel(dataFromFirebase.Model || "");
          setPret(dataFromFirebase.Pret || "");
          setMarca(dataFromFirebase.Marca || "");
          setAn(dataFromFirebase.An || "");
          setKm(dataFromFirebase.Km || "");
          setDetalii(dataFromFirebase.Detalii || "");
          setImagine(dataFromFirebase.Imagine || "");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      await fetchDataFromFirebase();
      // Reset the form fields to their initial state
    } catch (error) {
      console.error("Error editing car:", error);
    } finally {
      setLoading(false);
      setEditing(false); // Hide the edit form after submission
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

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://zh4hwg-5050.csb.app/sterge/${id}`, {
        method: "DELETE",
      });

      const updatedCars = await response.json();
      // Do something with the updatedCars data, e.g., update your component state
      console.log("Updated Cars:", updatedCars);
      navigate("/"); // Redirect to the list page or handle as needed
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="mt-4">
      <p>.</p>
      <Container className="mt-5">
        <Card className="shadow-lg">
          <Row noGutters>
            <Col lg={7}>
              <Card.Img
                variant="top"
                src={`/img/${item?.Imagine}`}
                alt={item?.Model}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col lg={5}>
              <Card.Body className="d-flex flex-column h-100">
                <div>
                  <Card.Title>
                    {item?.Marca} {item?.Model}
                  </Card.Title>
                  <Card.Text>Preț: {item?.Pret} €</Card.Text>
                  <Card.Text>Detalii: {item?.Detalii}</Card.Text>
                  {/* Add other details as needed */}
                </div>
                <div className="mt-auto mb-2">
                  <Button
                    variant="success"
                    onClick={handleEditClick}
                    className="shadow-lg border"
                    style={{ width: "30%" }}
                  >
                    Editeaza
                  </Button>

                  <Button
                    variant="dark"
                    onClick={handleDeleteClick}
                    style={{ width: "30%", marginLeft: "15px" }}
                  >
                    Șterge
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={handleBackToList}
                    style={{ width: "30%", marginLeft: "15px" }}
                  >
                    Înapoi
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>

        {editing && (
          <Container id="editFormContainer" style={stil} className="mt-5">
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Model:</Form.Label>
                <Form.Control
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
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
        )}
      </Container>
    </div>
  );
};

export default DetaliiAuto;
