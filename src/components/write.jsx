import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Write extends Component {
    render() {
        return (
            <div className="write">
                <h1>Write</h1>

                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Article Title</Form.Label>
                        <Form.Control type="text" placeholder="My Article!!"/>
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Article Content</Form.Label>
                        <Form.Control as="textarea" rows="8" placeholder="Today, I..."/>
                    </Form.Group>

                    <Form.Group controlId="tags">
                        <Form.Label>Add a tag to your article</Form.Label>
                        <Form.Control type="text" placeholder="My tag"/>
                    </Form.Group>
                </Form>

                <div id="submitButton">
                    <Button variant="primary" type="submit">Submit</Button>
                </div>

            </div>
        );
    }
}

export default Write;
