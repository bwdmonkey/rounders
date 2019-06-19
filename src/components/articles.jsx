import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = { json: [] }
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
        fetch('/articles')
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
