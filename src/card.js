import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./Cards.css"; // Import the CSS file for additional styling

const Cards = () => {
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();

  const fetchDataFromFirebase = async () => {
    try {
      const response = await fetch("http://localhost:5050/masini");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataFromFirebase = await response.json();
      setLista(dataFromFirebase);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromFirebase();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/detalii/${item.id}`);
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Container>
      <Row>
        {lista.map((item) => (
          <Col key={item.id} lg={3} sm={6} className="mt-3 mb-3 d-flex">
            <Card
              className={`custom-card ${hoveredCard === item.id ? "hovered" : ""} shadow-lg`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(item)}
            >
              <Card.Img
                variant="top"
                src={`/img/${item.Imagine}`}
                style={{
                  // muta pe card
                  width: "286px",
                  height: "195px",
                  objectFit: "stretch",
                }}
              />

              <Card.Title className="title">
                {item.Marca} {item.Model}
              </Card.Title>
              <Card.Text className="price">{item.Pret} €</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
