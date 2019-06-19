import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function getJson() {
    // JSON PARSER
    return [{ "ID": "1", "username": "SmoothieX", "created_at": "2999-01-08 04:05:06", "title": "Dinner", "Content": "Today I ate dinner at McDonalds"}, 
            { "ID": "2", "username": "Smoothief", "created_at": "2999-01-08 04:05:06", "title": "Dinner Again", "Content": "Second dinner at McDonalds"}];
  }

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = { json: [], }
    }

    searchTitle = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        fetch('/articles?title=' + encodeURIComponent(form.elements.formArticleFilter.value))
            .then(res => res.json())
            .then(json => {this.setState({ json: json.result })})
            .catch(console.log);
    }

    componentDidMount = () => {
        fetch('/articles?title=')
            .then(res => res.json())
            .then(json => {this.setState({ json: json.result })})
            .catch(console.log);
    }

    render() {
        return (
            <div className="articles">
                <h1>Articles</h1>
                
                <div id="articleFilter">
                    <Form onSubmit={this.searchTitle}>
                        <Form.Group controlId="formArticleFilter">
                            <Form.Label>Search Title Keywords</Form.Label>
                            <Form.Control className="m-b-5" type="text" placeholder="Keywords" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Filter
                        </Button>
                    </Form>
                </div>

                {this.state.json.map((data, i) => {
                    return (
                    <div key={i}>
                        {/* <td>{data.ID}</td> */}
                        <h3>{data.title}</h3>
                        <h4>By {data.username} -- {data.created_at}</h4>
                        <h5>{data.content}</h5>
                    </div>
                    )
                })}
            </div>
        );
    }
}

export default Articles;

