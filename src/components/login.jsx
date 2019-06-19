import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });

        localStorage.setItem('user_id', form.elements.formId.value)
    }

    render() {
        const { validated } = this.state;

        return (
            <div className="login">
                <h1>Log In</h1>
                <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="formId">
                        <Form.Label>ID</Form.Label>
                        <Form.Control required type="number" placeholder="Enter ID" />
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
