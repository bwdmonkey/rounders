import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            redirect: false,
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });

        let data = {
            username: form.elements.formUsername.value,
            firstName: form.elements.formFirstName.value,
            lastName: form.elements.formLastName.value,
            email: form.elements.formEmail.value,
            password: form.elements.formPassword.value,
            bankAccount: {
                instituteName: form.elements.formInstituteName.value,
                instituteNumber: form.elements.formInstituteNumber.value,
                transitNumber: form.elements.formTransitNumber.value,
                accountNumber: form.elements.formAccountNumber.value
            }
        }

        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then( _ => { this.setState({ redirect: true })})
        .catch(err => console.log("err", err));
    }

    render() {
        const { validated } = this.state;
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login' />;
        }

        return (
            <div className="register">
                <h1>Register</h1>
                <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required className="m-b-5" type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="formFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="First Name"/>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Last Name"/>
                        </Form.Group>

                    </Form.Row>


                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formInstituteName">
                        <Form.Label>Bank Account Information</Form.Label>
                        <Form.Control required type="text" placeholder="Institute Name - eg. CIBC" />
                    </Form.Group>
                    <Form.Group controlId="formInstituteNumber">
                        <Form.Control required type="text" placeholder="Institute Number - eg. 010" />
                    </Form.Group>
                    <Form.Group controlId="formTransitNumber">
                        <Form.Control required type="text" placeholder="Transit Number - eg. 05800" />
                    </Form.Group>
                    <Form.Group controlId="formAccountNumber">
                        <Form.Control required type="text" placeholder="Account Number - eg. 1234567" />
                    </Form.Group>


                    <Form.Group controlId="formGrading">
                        <Form.Check
                            type="checkbox"
                            className="text-muted"
                            label="By checking this box, you agree to grade this project with generousity." />
                    </Form.Group>

                    <div id="submitButton">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Register;
