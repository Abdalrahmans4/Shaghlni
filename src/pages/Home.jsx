import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PopUp from "../components/Popup";
import DevCards from '../components/DevCards';
const Home = () => {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <PopUp openPopUp={openPopup} closePopUp={() => setOpenPopup(false)} />

          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="mb-4">What You Can Find with <br />Shaghelni!</h1>
              <p className="lead">
                Shaghelni is a simple yet powerful platform that helps freelancers showcase their skills and lets clients find the right person
              </p>
              <Button 
                variant="primary"
                size="lg"
                onClick={() => setOpenPopup(true)}
              >
                Get Started
              </Button>
            </Col>

            <Col md={6}>
              <img
                src={
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                }
                alt="Hero"
                className="img-fluid rounded mt-3"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Project Preview Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5">With Shaghelni:</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Freelancer Profiles</Card.Title>
                  <Card.Text>A simple, public profile system where freelancers can add their skills, projects, and experience for everyone to see.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Live Talent Board</Card.Title>
                  <Card.Text>Real-time display of all submitted freelancer cards. Clients can view, filter, and connect with suitable talent directly.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Smart Skill Matching</Card.Title>
                  <Card.Text>Each freelancer card includes key skills and tools, making it easy for clients to scan and spot the right person for the job.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <DevCards />



    </>
  );
};

export default Home;
