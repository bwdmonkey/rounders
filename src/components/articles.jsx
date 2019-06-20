import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [
            {
                article_id: 1,
                username: "SmoothieX",
                created_At: "2999-01-08 04:05:06",
                title: "Dinner",
                content: "Today I ate dinner at McDonalds",
                clapNumber: 12
            },
            {
                article_id: 2,
                username:"Smoothief",
                created_at:"2999-01-08 04:05:06",
                title: "Dinner Again",
                content: "Second dinner at McDonalds",
                claps: 35
            }],
            claps: [
            {
                article_id: 1,
                amount: 12
            },
            {
                article_id: 2,
                amount: 35
            }], // mock data
        }
    }

    searchTitle = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        fetch('/articles?title=' + encodeURIComponent(form.elements.formArticleFilter.value))
            .then(res => res.json())
            .then(json => {this.setState({ articles: json.result })})
            .catch(console.log);
    }

    handleClaps = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // if (form.checkValidity() === false) {
        //     event.stopPropagation();
        // }
        // this.setState({ validatedInfo: true });

        const { article_id } = this.state;

        let data = { amount: 14, } // amount + 1

        fetch('/articles/' + article_id + '/reactions', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .catch(err => console.log("err", err));
    }

    componentDidMount = () => {
        fetch('/articles')
            .then(res => res.json())
            .then(json => {this.setState({ articles: json.result })})
            .catch(console.log);

        let article_id = 1 // need to fill in

        fetch('/articles/' + article_id + '/reactions')
            .then(res => res.json())
            .then(claps => {this.setState({ claps: claps.result })})
            .catch(console.log);

        // merge two sets of data
        // let json = json;
        // let claps = claps;
        // let merged = [];

        // for(let i = 0; i < json.length; i++) {
        //     merged.push({
        //     ...json[i],
        //     ...(claps.find((item) => item.article_id === json[i].id))});
        // }
        // console.log(merged);
    }

    render() {
        const { articles } = this.state;

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

            {/* TODO: if state.articles is empty, then display "sorry no articles found"*/}
                {articles.map((data, i) => {
                    return (
                    <div key={i} id="claps">
                        <hr></hr>
                        <h3>{data.title}</h3>
                        <h4>By {data.username} -- {data.created_at}</h4>
                        <h5>{data.content}</h5>

                        <h4>Number of Claps For This Article: {data.clapNumber}</h4>
                        <Button variant="primary" type="submit">
                            <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
                        </Button>
                    </div>
                    )
                })}
            </div>
        );
    }
}

export default Articles;
