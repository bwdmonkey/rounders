import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            leaderboard: [
                { username: 'Harry',
                  total_claps: 65,
                  num_articles: 2
                },
                { username: 'Ron',
                  total_claps: 15,
                  num_articles: 1
                },
                { username: 'Albus',
                  total_claps: 12,
                  num_articles: 1
                },
                { username: 'Hermoine',
                  total_claps: 5,
                  num_articles: 1
                }
            ],
            popularArticles: [
                { "ID": "1", 
                  "UserName": "SmoothieX", 
                  "Written_At": "2999-01-08 04:05:06", 
                  "Title": "Dinner In Vanvoucer", 
                  "Content": "Today I ate dinner at McDonalds"
                }, 
                { "ID": "2", 
                  "UserName": "Smoothief", 
                  "Written_At": "2999-01-08 04:05:06", 
                  "Title": "Dinner In LA", 
                  "Content": "Second dinner at McDonalds"
                }
            ]
        }
    }

    componentDidMount() {
        fetch('/leaderboard')
            .then(res => res.json())
            .then(leaderboard => 
                this.setState({leaderboard: leaderboard.result }))
            .catch(_ => {});

        fetch('/articles')
            .then(res => res.json())
            .then(popularArticles => this.setState({popularArticles: popularArticles.result}))
            .catch(_ => {});
    }

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

                <div className="articles" id="leaderBoard">
                    <h1>Leader Board</h1>
                    {this.state.leaderboard.map((data, i) => {
                        return (
                        <p key={i}>
                            <hr></hr>
                            <h3>{data.username}</h3>
                            <h4>-- {data.total_claps} claps received, wrote {data.num_articles} article(s) this week</h4>
                        </p>
                        )
                    })}
                </div>

                <div className="articles" id="pArticles">
                    <h1>Popular Articles</h1>
                    {this.state.popularArticles.map((data, i) => {
                        return (
                        <p key={i}>
                            <hr></hr>
                            <h3>{data.Title}</h3>
                            <h4>By {data.UserName} -- {data.Written_At}</h4>
                            <h5>{data.Content}</h5>
                        </p>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default HomePage;