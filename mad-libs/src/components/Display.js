import React, { Component } from 'react';

import Header from './Header';


class Display extends Component {
    render (props) {

        return (
            
            <div className="outer-container">
                <Header title={this.props.title} />
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Display;