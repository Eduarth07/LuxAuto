import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./Cards.css";
import bmwLogo from "./bmw.png";
import mercedesLogo from "./mercedes.png";
import audiLogo from "./audi.png";
import jaguarLogo from "./jaguar.png";

const BrandCards = () => {
  const { brand } = useParams();
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const response = await fetch("http://localhost:5050/masini");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataFromFirebase = await response.json();
        // Filter the cars based on the selected brand
        const filteredCars = dataFromFirebase.filter(
          (car) => car.Marca === brand,
        );
        setLista(filteredCars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirebase();
  }, [brand]);

  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/detalii/${item.id}`);
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const brandLogos = {
    BMW: bmwLogo,
    Mercedes: mercedesLogo,
    Audi: audiLogo,
    Jaguar: jaguarLogo,
    // Add more brands and logos as needed
  };

  const logoSrc = brandLogos[brand];

  return (
    <div className="shadow pt-5 mt-5">
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-center align-items-center ">
          <Image
            src={logoSrc}
            fluid
            style={{ width: "80px", marginRight: "10px" }}
          />
        </Card.Header>
      </Card>
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
    </div>
  );
};

export default BrandCards;
