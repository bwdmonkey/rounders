import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div className="home">
                <h1>
                    Welcome to Rounders!
                </h1>

                <div id="existingUsers">
                    <h2>
                        Existing users? Please log in.
                    </h2>

                    <p>
                        ... log in input ...
                    </p>
                </div>
                
                <div id="newUsers">
                    <h2>
                        New users? Register below.
                    </h2>

                    <p>
                        ... registration input ...
                    </p>
                </div>
            </div>
        );
    }
}

export default HomePage;