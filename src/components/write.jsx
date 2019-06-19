import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class Write extends Component {
    // probably don't need a constructor here??? 
    //
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // uhhh
        let data = {
            title: form.elements.formTitle.value,
            content: form.elements.formContent.value,
            // this should be a list of strings
            tags: this.state.tags,
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

    handleTagChange = (event) => {
        //alert(event.target.value);
        let validTags = [ "bananas", "apples", "mouse" ];
        let tagList = event.target.value.split(',').map(w=>w.trim());

        this.setState( { tags: tagList.filter(w=>validTags.indexOf(w) > -1)});
    }

    render() {
        return (
            <div className="write">
                <h1>Write an Article</h1>

                <Form onSubmit={e => this.handleSubmit(e)} >
                    <Form.Group controlId="formTitle">
                        <Form.Label>Article Title</Form.Label>
                        <Form.Control type="text" placeholder="My Article!!"/>
                    </Form.Group>

                    <Form.Group controlId="formContent">
                        <Form.Label>Article Content</Form.Label>
                        <Form.Control as="textarea" rows="8" placeholder="Today, I..."/>
                    </Form.Group>

            {/* TODO: make sure this is a valid set of tags*/}
                    <Form.Group controlId="formTags">
                        <Form.Label>Add a tag to your article</Form.Label>
                        <Form.Control type="text" placeholder="My tag" onChange={this.handleTagChange}/>
                    </Form.Group>
            <h6>
            <div>
                {this.state.tags.map(t => <Badge variant='primary'> {t} </Badge>)}
            </div>
            </h6>
                <div id="submitButton">
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            </Form>

            </div>
        );
    }
}

export default Write;
