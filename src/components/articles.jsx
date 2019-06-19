import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function getJson() {
    // JSON PARSER
    return [{ "ID": "1", "Username": "SmoothieX", "Written_At": "2999-01-08 04:05:06", "Title": "Dinner", "Content": "Today I ate dinner at McDonalds"}, 
            { "ID": "2", "Username": "Smoothief", "Written_At": "2999-01-08 04:05:06", "Title": "Dinner Again", "Content": "Second dinner at McDonalds"}];
  }

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = { json: [] }
    }

    componentDidMount() {
        this.setState((prevState) => {
            return {
                json: getJson()
            }
        })
    }

    render() {
        return (
            <div className="articles">
                <h1>Articles</h1>
                
                <div id="articleFilter">
                        <Form.Group controlId="formarticleFilter">
                            <Form.Label>Search Title Keywords</Form.Label>
                            <Form.Control className="m-b-5" type="text" placeholder="Keywords" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Filter
                        </Button>
                </div>

                {this.state.json.map((data, i) => {
                    return (
                    <p key={i}>
                        <hr></hr>
                        <h3>{data.Title}</h3>
                        <h4>By {data.Username} -- {data.Written_At}</h4>
                        <h5>{data.Content}</h5>
                    </p>
                    )
                })}
            </div>
        );
    }
}

export default Articles;

