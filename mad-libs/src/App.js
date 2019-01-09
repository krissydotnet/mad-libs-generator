import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './App.css';
import './styles/styles.css';

import Words from './components/Words';
import Display from './components/Display';
import { stories, questions } from './data/data';




const placeholderRegEx = RegExp(/\{\{(.*?)\}\}/, 'gi');



class App extends Component {

    state = {
      isSubmitted: false,
      story: '',
      index: 0,
      inputs: []
    }
  
    componentDidMount() {
      this.loadStory();
   }

   loadStory = () => {
    
     let index = Math.floor(Math.random() * stories.length);
     let story = stories[index];

    this.setState({
      story: story,
      index: index,
      inputs: [...this.generateQuestions(story.text)]
    });
    

   }

    generateQuestions = (text) => {
      const words = text.match(placeholderRegEx).map( (item, index) => {
          const word = item.replace(/[{}]/g, '');
        return ({
          name: `${word}_${index}`,
          question: questions[word],
          answer: ''
        })
        
      });

      return words;
      
    }


  handleSubmit = () => {
    this.setState({
      isSubmitted: true
    });
    
  }

  handleSaveData = (data) => {
    this.setState(  {
       isSubmitted: true,
       inputs: [...data]
      
    });
  }

  loadAnswers = () => {

    let index = 0;
    return  this.state.story.text.split(/[\s]/).map( (word) => {
      if (placeholderRegEx.test(word)) {
        return `<span class="highlight">${word.replace(placeholderRegEx, this.state.inputs[index++].answer)}</span>`;
      } else {
        return word;
      }
      
    }).join(' ');
    
  }
      


  render() {
    if (!this.state.isSubmitted) {
      return (
        <div className="App">
        <Words words={this.state.inputs} saveData={this.handleSaveData} />
      </div>
      );

    } else {

        const answers = ReactHtmlParser(this.loadAnswers());

      return (
        <div className="App">
        <Display text={answers} title={this.state.story.title}/> 
        </div>
      );
    }

  }
}

export default App;
