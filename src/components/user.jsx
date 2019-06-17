import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function getJson() {
    // JSON PARSER FOR ONE TUPLE ONLY
    return [{ "ID": "1", "Premium_User": "No","Username": "Smoothief", "Balance": "2.60", "Password": "Dinner"}];
}

class User extends Component {
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
            <div className="user">
                <h1>User</h1>

                <table className="userProfile">
                    {this.state.json.map((data, i) => {
                        return (
                        <tbody key={i}>
                            <tr>
                                <th>User ID:</th>
                                <td>{data.ID}</td>
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <td>{data.Username}</td>
                            </tr>
                            <tr>
                                <th>Premium User:</th>
                                <td>{data.Premium_User}</td>
                            </tr>
                            <tr>
                                <th>Account Balance:</th>
                                <td>{data.Balance}</td>
                            </tr>
                            <tr>
                                <th>Password:</th>
                                <td>{data.Password}</td>
                            </tr>
                        </tbody>
                        )
                    })}
                </table>

                <hr></hr>

                <Form>
                    <div id="changeUsername">
                        <Form.Group controlId="formChangeUsername">
                            <Form.Label>Change Your Username</Form.Label>
                            <Form.Control type="text" placeholder="New Username" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Username
                        </Button>
                    </div>

                    <div id="changePassword">
                        <Form.Group controlId="formChangePassword">
                            <Form.Label>Change Your Password</Form.Label>
                            <Form.Control className="password" type="password" placeholder="Old Password" />
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Password
                        </Button>
                    </div>

                    <div id="premiumSignUp">
                        <h2>Not A Premium User? Sign Up in One Click!</h2>
                        <Button variant="primary" type="submit">
                            Premium Sign Up!
                        </Button>
                    </div>

                    <div id="addMoney">
                        <Form.Group controlId="formAddMoney">
                            <Form.Label>Add Money to Your Account</Form.Label>
                            <Form.Control className="m-b-5" type="text" placeholder="Amount" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Amount
                        </Button>
                    </div>

                </Form>
            </div>
        );
    }
}

export default User;
