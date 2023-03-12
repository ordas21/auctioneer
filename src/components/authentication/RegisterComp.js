import { Button, Form, Modal, Alert } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const RegisterComp = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');


  const nameRef = useRef();
  const streetAddressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipCodeRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();

  const { register } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordRef.current.value !== cmfPasswordRef.current.value) {
      return setError('Passwords does not match');
    }

    try {
      await register(nameRef.current.value, emailRef.current.value, passwordRef.current.value, streetAddressRef.current.value, cityRef.current.value, stateRef.current.value, zipCodeRef.current.value, phoneNumberRef.current.value);
      closeForm();
    } catch (error) {
      setError(error.message);
    }

    

  };

  return (
    <>
      <div onClick={openForm} className="btn btn-outline-secondary mx-2">
        Register
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" required ref={streetAddressRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" required ref={cityRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control type="text" required ref={stateRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" required ref={zipCodeRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" required ref={phoneNumberRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={cmfPasswordRef} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
