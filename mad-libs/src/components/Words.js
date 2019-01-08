import React, { Component } from 'react';
import Word from './Word';

class Words extends Component {

    render(props) {
        const copyData = this.props.words;

        const handleSubmit = (e) => {
            e.preventDefault();
            this.props.saveData(copyData);  
        }
        const handleChange = (e) => {
            let index = e.target.name.match(/\d+/)[0];
            copyData[index].answer = e.target.value;
        }
        return (
         <div className="outer-container">
            <form onSubmit={handleSubmit}>
            {this.props.words.map( word => {

                return (
                    <Word key={word.name} name={word.name} question={word.question} handleChange={handleChange}   />
                )
                }) }
                    <button type="submit">Submit</button>
            </form>
            </div>
            
       );
                
        
    }
}

export default Words;