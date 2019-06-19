import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import TagSelector from './tagselector.jsx'

class Write extends Component {
    // probably don't need a constructor here??? 
    //
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
        }
        // bite me
        this.tagSelector = React.createRef();
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // uhhh
        let data = {
            title: form.elements.formTitle.value,
            content: form.elements.formContent.value,
            // this should be a list of strings
            tags: this.tagSelector.current.state.selectedTags,
        }

        console.log(JSON.stringify(data));

        fetch('/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then( _ => { /* TODO: something probably goes here? wipe all the forms? */ })
        .catch(err => console.log("something bad happened", err));
    }

    render() {
        return (
            <div className="write">
                <h1>Write an Article</h1>

                <Form ref='form' onSubmit={e => this.handleSubmit(e)} >
                    <Form.Group controlId="formTitle">
                        <Form.Label>Article Title</Form.Label>
                        <Form.Control type="text" placeholder="My Article!!"/>
                    </Form.Group>

                    <Form.Group controlId="formContent">
                        <Form.Label>Article Content</Form.Label>
                        <Form.Control as="textarea" rows="8" placeholder="Today, I..."/>
                    </Form.Group>

                    <TagSelector label="Add one of our tags to your article" ref={this.tagSelector}/>

                    <div id="submitButton">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Write;
