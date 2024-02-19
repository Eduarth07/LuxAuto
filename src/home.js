import React from "react";

import { Container, Row, Col, Image } from "react-bootstrap";
import img1 from "./hero.png";
import Cards from "./card";
import bmwLogo from "./bmw.png";
import mercedesLogo from "./mercedes.png";
import audiLogo from "./audi.png";
import jaguarLogo from "./jaguar.png";

const Home = () => {
  return (
    <>
      <div className="shadow pt-5 my-5">
        <Container>
          <Row>
            <Col lg={7} className="d-flex align-items-center">
              <div>
                <h1 className=""> LuxAuto </h1>
                <h2 className=""> Descoperă luxul în mișcare la LuxAuto! </h2>
              </div>
            </Col>
            <Col lg={5}>
              {" "}
              <Image fluid src={img1} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt-5">
        <Cards />
      </Container>
      <div className="mt-4 py-3 d-flex justify-content-center shadow-lg">
        <Image src={bmwLogo} fluid style={{ width: "60px" }} />
        <Image
          src={mercedesLogo}
          fluid
          style={{ width: "60px", marginLeft: "15px" }}
        />
        <Image
          src={jaguarLogo}
          fluid
          style={{ width: "60px", marginLeft: "15px" }}
        />
        <Image
          src={audiLogo}
          fluid
          style={{ width: "60px", marginLeft: "15px" }}
        />
      </div>
    </>
  );
};

export default Home;
