import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>

                <div id="header">
                        ROUNDERS
                </div>

                <div id="navigation">
                    <a href="/">Home</a>| 
                    <a href="articles">Articles</a>|
                    <a href="write">Write</a>|   
                    <a href="register">Register</a>|
                    <a href="login">Login</a>|
                    <a href="user">User</a>|
                    <a href="analytics">Admin</a>
                </div>

            </header>
        );
    }
}

export default Header;