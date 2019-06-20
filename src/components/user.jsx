import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class User extends Component {
    constructor(props) {
        super(props)
        let doRedirect = false;
        if (localStorage.getItem('user_id') == null) {
            doRedirect = true;
        }
        this.state = {
            json: [],
            user_id: localStorage.getItem('user_id'),
            user: {},
            userArticles: [],
            redirect: doRedirect,
            validatedInfo: false,
            validatedArticle: false,
        }
    }

    componentDidMount() {
        const { user_id } = this.state;
        fetch('/users/' + user_id)
            .then(res => res.json())
            .then(data => {
                if (data.result.length !== 1) {
                    return this.setState({ redirect: true })
                }
                this.setState({user: data.result[0] })
            })
            .catch(_ => {});

        fetch('/users/' + user_id + '/articles')
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

        const { user_id } = this.state;

        let data = {
            password: form.elements.formNewPassword.value,
        }

        fetch('/users/' + user_id, {
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

        let article_id = form.elements.formDeleteArticleID.value

        fetch('/articles/' + article_id, {
            method: 'DELETE',
        }).then(
            window.location.reload()
        ).catch(err => console.log("err", err));
    }

    render() {
        const { user } = this.state;
        const { userArticles } = this.state;
        const { validatedInfo } = this.state;
        const { validatedArticle } = this.state;
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login' />;
        }

        return (
            <div className="user">
                <h1>User</h1>

                <table className="userProfile">
                    <tbody>
                            <tr>
                                <th>User ID:</th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>Last Name:</th>
                                <td>{user.last_name}</td>
                            </tr>
                            <tr>
                                <th>First Name:</th>
                                <td>{user.first_name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                    </tbody>
                </table>

                <table className="userArticles">
                    <tbody>
                        <tr>
                            <th colSpan={2}>Your Articles: (Article ID and Article Title)</th>
                        </tr>
                        {userArticles.map(function(article, i){
                            return (
                                <tr key={i}>
                                    <td>{article.id}</td>
                                    <td>{article.title}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <hr></hr>

                <Form noValidate validated={validatedInfo} onSubmit={e => this.handlePasswordChange(e)}>
                    <div id="changePassword">
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Change Your Password</Form.Label>
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
