import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <h1>Log In</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div id="submitButton">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                    
                </Form>
            </div>
        );
    }
}

export default Login;
