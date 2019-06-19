import React, { Component } from 'react';

// function getJson() {
//     // JSON PARSER
//     return [{ "ID": "1", "UserName": "SmoothieX", "Written_At": "2999-01-08 04:05:06", "Title": "Dinner In Vanvoucer", "Content": "Today I ate dinner at McDonalds"}, 
//             { "ID": "2", "UserName": "Smoothief", "Written_At": "2999-01-08 04:05:06", "Title": "Dinner In LA", "Content": "Second dinner at McDonalds"}];
//   }

class HomePage extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { json: [] }
    // }

    // componentDidMount() {
    //     this.setState((prevState) => {
    //         return {
    //             json: getJson()
    //         }
    //     })
    // }

    render() {
        return (
            <div className="home">
                <h1>Welcome to Rounders!</h1>

                <div id="existingUsers">
                    <h2>Existing users? Please log in.</h2>
                    >><a href="login">Login</a>
                </div>
                
                <div id="newUsers">
                    <h2>New users? Register below.</h2>
                    >><a href="register">Register</a>
                </div>

                {/* <div className="articles" id="pArticles">
                    <h1>Popular Articles</h1>
                    {this.state.json.map((data, i) => {
                        return (
                        <p key={i}>
                            <hr></hr>
                            <h3>{data.Title}</h3>
                            <h4>By {data.UserName} -- {data.Written_At}</h4>
                            <h5>{data.Content}</h5>
                        </p>
                        )
                    })}
                </div> */}
            </div>
        );
    }
}

export default HomePage;