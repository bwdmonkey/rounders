import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class Register extends Component {
    render() {
        return (
            <div className="register">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicBankAccount">
                        <Form.Label>Bank Account Information</Form.Label>
                        <Form.Control className="m-b-5" type="text" placeholder="Institute Name - eg. CIBC" />
                        <Form.Control className="m-b-5" type="text" placeholder="Institute Number - eg. 010" />
                        <Form.Control className="m-b-5" type="text" placeholder="Transit Number - eg. 05800" />
                        <Form.Control className="m-b-5" type="text" placeholder="Account Number - eg. 1234567" />
                    </Form.Group>

                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" className="text-muted" label="By checking this box, you agree to grade this project with generousity." />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;
