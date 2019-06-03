import React from "react";
import Hero from "../components/Hero";
import { Col, Row, Container } from "../components/Grid";


function About() {
  return (
    <div>
      <Hero backgroundImage="../assets/images/busy.jpg">
        <h1>Busy Todo List</h1>
        <h2>Get busy!</h2>
      </Hero>
      <Container style={{ marginTop: 30 }} background="none">
        <Row>
          <Col size="md-12">
            <center>
            <h1>Want to keep your busy list in one place?</h1>
            </center>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <center>
            <p>
              Get started adding items to your todo list. Waste less time trying to remember what you need to
              do and more time doing it! I
            </p>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
