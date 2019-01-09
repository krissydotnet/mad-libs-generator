import React, { Component } from 'react';


class Word extends Component {
    render(props) {
        return (
            <div className="row-container">
            <label htmlFor={this.props.name}>{this.props.question}:</label><input type="text" name={this.props.name} onChange={this.props.handleChange}></input>
            </div>
        );
    }
}

export default Word;