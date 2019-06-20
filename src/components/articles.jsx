import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: localStorage.getItem('user_id'),
            articleBeingClapped: null,
            clapButtonIntervalId: null,
            tmpClaps: 0,
            articles: [],
        }
    }

    componentDidMount = () => {
        fetch('/articles/deep')
            .then(res => res.json())
            .then(json => {this.setState({ articles: json.result })})
            .catch(console.log);
    }

    searchTitle = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        fetch('/articles?title=' + encodeURIComponent(form.elements.formArticleFilter.value))
            .then(res => res.json())
            .then(json => {this.setState({ articles: json.result })})
            .catch(console.log);
    }

    getTotalClaps = (article) => {
        let total = 0;
        let reactions = article.reactions;
        if (reactions.length > 0) {
            for (let i = 0; i < reactions.length; i++) {
                if (reactions[i].count !== undefined) {
                    total += reactions[i].count
                }
            }
        }
        return total;
    }

    getUserClaps = (article) => {
        const { user_id } = this.state;
        const { articleBeingClapped } = this.state;
        const { tmpClaps } = this.state;

        if (user_id === null) return 0;
        if (article.id === articleBeingClapped) {
            return tmpClaps;
        }
        let reactions = article.reactions;
        if (reactions.length > 0) {
            for (let i = 0; i < reactions.length; i++) {
                if (reactions[i].user_id !== undefined && reactions[i].user_id === parseInt(user_id, 10)) {
                    return reactions[i].count
                }
            }
        }
        return 0;
    }

    isContainedInReaction = (article) => {
        const { user_id } = this.state;
        if (user_id === null) return false;
        let reactions = article.reactions;
        if (reactions.length > 0) {
            for (let i = 0; i < reactions.length; i++) {
                if (reactions[i].user_id !== undefined && reactions[i].user_id === parseInt(user_id, 10)) {
                    return true
                }
            }
        }
        return false;
    }


    handleMouseDown = (article) => {
        const { clapButtonIntervalId } = this.state;

        if (clapButtonIntervalId === null) {
            this.setState({
                articleBeingClapped: article.id,
                tmpClaps: this.getUserClaps(article),
                clapButtonIntervalId: setInterval(this.handleMouseDownHelper, 200),
            });
        }
    }

    handleMouseDownHelper = () => {
        this.setState(prev => ({
            tmpClaps: Math.min(prev.tmpClaps + 1, 50)
        }))
    }

    handleMouseEnd = (article) => {
        const { user_id } = this.state;
        const { clapButtonIntervalId, articleBeingClapped } = this.state;
        if (clapButtonIntervalId !== null) {
            clearInterval(clapButtonIntervalId)
            if (this.isContainedInReaction(article)) {
                let data = {
                    count: this.getUserClaps(article)
                }
                fetch(`/reactions/${parseInt(user_id, 10)}/${articleBeingClapped}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(_ => window.location.reload())
                .catch(console.log);
            } else {
                let data = {
                    user_id: parseInt(user_id, 10),
                    article_id: articleBeingClapped,
                    count: this.getUserClaps(article)
                }
                fetch('/reactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(_ => window.location.reload())
                .catch(console.log);
            }
        }
    }

    generateClapButton = (article) => {
        const { user_id } = this.state;

        if (user_id === null) {
            return (
                <Button variant="primary" type="button" disabled>
                    <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
                    &nbsp;
                    0
                </Button>
            )
        } else {
            return (
                <button type="button" className="btn btn-primary" onMouseDown={this.handleMouseDown.bind(this, article)} onMouseUp={this.handleMouseEnd.bind(this, article)} onMouseLeave={this.handleMouseEnd.bind(this, article)}>
                    <i data-id={article.id.toString()} className="fa fa-hand-peace-o" aria-hidden="true"></i>
                    &nbsp;
                    {this.getUserClaps(article)}
                </button>
            )
        }
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
                    <div key={'articleRow' + i} id="claps">
                        <hr></hr>
                        <h3>{data.title}</h3>
                        <h4>By {data.username} -- {data.created_at}</h4>
                        <h5>{data.content}</h5>

                        <h4>Number of Claps For This Article: {this.getTotalClaps(data)}</h4>

                        {this.generateClapButton(data)}
                    </div>
                    )
                })}
            </div>
        );
    }
}

export default Articles;
