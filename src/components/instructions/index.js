import React, { Component } from 'react';

export class Instructions extends Component {

    render() {
        return (
            <div className="pd-4 text-white info-div">
                <br/>
                <h3>Is your Django Server Running ?? Run the Django Server and refresh</h3><br /><br />
                <h4>For help <a target="_blank" rel="noopener noreferrer" href="https://github.com/shagunbandi/albumify-backend/blob/master/README.md">Click Here</a></h4>
            </div>
        );
    }
}

export default Instructions;