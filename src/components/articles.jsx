import React, { Component } from 'react';

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
                {this.state.json.map((data, i) => {
                    return (
                    <p key={i}>
                        <hr></hr>
                        {/* <td>{data.ID}</td> */}
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

