// About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">About iNotebook</h2>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center">Introduction</Card.Title>
              <Card.Text>
                Welcome to iNotebook, a versatile note-taking application designed to simplify and organize your thoughts.
                I'm [Suhrad Trambadiya], and I'm excited to showcase the capabilities of this app.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center">MERN Stack Architecture</Card.Title>
              <Card.Text>
                Built using the MERN stack (MongoDB, Express.js, React, Node.js). The frontend, developed with React,
                provides a modern and responsive user interface styled with Bootstrap. The backend, powered by Express.js
                and Node.js, seamlessly interacts with MongoDB for efficient data storage and retrieval.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center">Key Features</Card.Title>
              <Card.Text>
                <ul>
                  <li>Create, edit, and delete notes with ease.</li>
                  <li>Dynamic and intuitive user interface for a seamless experience.</li>
                  <li>Organize your notes with customizable tags.</li>
                  <li>Full CRUD (Create, Read, Update, Delete) functionality for efficient note management.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center">Animations</Card.Title>
              <Card.Text>
                Enhance user interaction with subtle animations:
                <ul>
                  <li>Smooth transitions between pages for a polished feel.</li>
                  <li>Animated note cards for an engaging visual experience.</li>
                  {/* Add more animation points as needed */}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <Card.Title className="text-center">Contact Information</Card.Title>
              <Card.Text>
                Feel free to reach out for any inquiries or feedback. Connect with me via [Your Email] or follow me on
                [Your Social Media].
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
