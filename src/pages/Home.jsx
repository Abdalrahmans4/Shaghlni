import React, {useState} from 'react';
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
              <h1 className="mb-4">Showcase Your Development Projects</h1>
              <p className="lead">
                Create, display, and share your web development projects in one
                elegant place.
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
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Project Preview Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5">Featured Developer Projects</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Portfolio Website</Card.Title>
                  <Card.Text>A responsive personal portfolio made with React and Bootstrap.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Online Store</Card.Title>
                  <Card.Text>E-commerce front-end built with React Hooks and Firebase.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Blog Platform</Card.Title>
                  <Card.Text>Developer blog with Markdown, Node.js and MongoDB.</Card.Text>
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
