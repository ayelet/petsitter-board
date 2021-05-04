import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "C:\bootcampworkspacepetsitter-boardclient\node_modules\bootstrapdistcss\bootstrap.min.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="passwordConfirm ">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="passwordConfirm "
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="btn w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  );
}
