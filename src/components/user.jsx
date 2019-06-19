import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class User extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            userInfo: {
                ID: 1, 
                Username: 'Smoothief', 
                last_name: 'Smith', 
                first_name: 'Divia', 
                Email: 'diviasm@outlook.com',
            },
            userArticles: [
                { ID: 10,
                  Title: 'black sill are large'
                },
                { ID: 21,
                  Title: 'Brunch',
                },
                { ID: 33,
                  Title: 'Halo',
                }
            ],
            validatedInfo: false,
            validatedArticle: false,
        };
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(userInfo => 
                this.setState({userInfo: userInfo.result }))
            .catch(_ => {});

        fetch('/articles')
            .then(res => res.json())
            .then(userArticles => this.setState({userArticles: userArticles.result}))
            .catch(_ => {});
    }

    // UPDATE - PATCH /users/:id (User password update)
    handlePasswordChange = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validatedInfo: true });

        let data = {
            username: form.elements.formUserID.value,
            firstName: form.elements.formNewPassword.value,
        }

        fetch('/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .catch(err => console.log("err", err));
    }

    // DELETE - DELETE /articles/:id (Article delete cascade delete reactions)
    handleArticleDelete = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validatedArticle: true });

        let data = {
            article_id: form.elements.formDeleteArticleID.value,
        }

        fetch('/articles', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then( // fetch articles again after deletion
            fetch('/articles')
            .then(res => res.json())
            .then(userArticles => this.setState({userArticles: userArticles.result}))
            .catch(_ => {})
        )
        .catch(err => console.log("err", err));
    }

    render() {
        const { userInfo } = this.state;
        // const { userArticles } = this.state;
        const { validatedInfo } = this.state;
        const { validatedArticle } = this.state;

        return (
            <div className="user">
                <h1>User</h1>

                <table className="userProfile">
                    <tbody>
                            <tr>
                                <th>User ID:</th>
                                <td>{userInfo.ID}</td>
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <td>{userInfo.Username}</td>
                            </tr>
                            <tr>
                                <th>Last Name:</th>
                                <td>{userInfo.last_name}</td>
                            </tr>
                            <tr>
                                <th>First Name:</th>
                                <td>{userInfo.first_name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{userInfo.Email}</td>
                            </tr>
                    </tbody>
                </table>

                <table className="userArticles">
                    <tbody>
                        <tr>
                            <th>Your Articles: (Article ID and Article Title)</th>
                        </tr>
                        <tr> 
                            {this.state.userArticles.map(function(article, i){
                                return (
                                    <div key={i}>
                                        <td>{article.ID}</td>
                                        <td>{article.Title}</td>
                                    </div>
                                )
                            })}
                        </tr> 
                    </tbody>
                </table>
                
                <hr></hr>

                <Form noValidate validated={validatedInfo} onSubmit={e => this.handlePasswordChange(e)}>
                    <div id="changePassword">
                        <Form.Group controlId="formUserID">
                            <Form.Label>Change Your Password</Form.Label>
                            <Form.Control className="password" type="text" placeholder="User ID" />
                        </Form.Group>
                        
                        <Form.Group controlId="formNewPassword">
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Update Password
                        </Button>
                    </div>
                </Form>

                <Form noValidate validated={validatedArticle} onSubmit={e => this.handleArticleDelete(e)}>
                    <div id="deleteArticle">
                        <Form.Group controlId="formDeleteArticleID">
                            <Form.Label>Delete The Article You Wrote By Entering The Article ID:</Form.Label>
                            <Form.Control className="m-b-5" type="text" placeholder="Article ID"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Delete
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default User;
