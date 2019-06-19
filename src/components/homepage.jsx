import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaderboard: [
                { username: 'Aarry',
                  total_claps: 65,
                  num_articles: 2
                },
                { username: 'Lon',
                  total_claps: 15,
                  num_articles: 1
                },
                { username: 'Alus',
                  total_claps: 12,
                  num_articles: 1
                },
                { username: 'Herine',
                  total_claps: 5,
                  num_articles: 1
                }
            ],
            popularArticles: [
                { "ID": "1",
                  "title": "Dinner In Vanvoucer",
                  "content": "Today I ate dinner at McDonalds",
                  "created_at": "2019-06-19T15:22:23.931Z",
                  "username":"hary",
                  "first_name":"Hry",
                  "last_name":"Poer"
                },
                { "ID": "2",
                  "title": "Dinner In LA",
                  "content": "Second dinner at McDonalds",
                  "created_at": "2019-06-19T15:22:23.931Z",
                  "username":"hary2",
                  "first_name":"Hry2",
                  "last_name":"Poer2"
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

        fetch('/trending')
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
                    <h1>Top Article</h1>
                    {this.state.popularArticles.map((data, i) => {
                        return (
                        <p key={i}>
                            <hr></hr>
                            <h3>{data.title}</h3>
                            <h4>By {data.username} -- {data.created_at}</h4>
                            <h5>{data.content}</h5>
                        </p>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default HomePage;

