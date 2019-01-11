import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './App.css';
import './styles/styles.css';

import Words from './components/Words';
import Display from './components/Display';
import Footer from './components/Footer';
import { stories, questions, ref } from './data/data';





const placeholderRegEx = RegExp(/\{\{(.*?)\}\}/, 'gi');



class App extends Component {

    state = {
      isSubmitted: false,
      story: '',
      index: 0,
      inputs: [],
      ref: {}
    }
  
    componentDidMount() {
      this.loadStory();
   }

   loadStory = () => {
    
     let index = Math.floor(Math.random() * stories.length);
    //  index = 3;
     let story = stories[index];

    this.setState({
      story: story,
      index: index,
      inputs: [...this.generateQuestions(story.text)],
      ref: ref
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
    let content;
    if (!this.state.isSubmitted)  {
      content =  <Words words={this.state.inputs} saveData={this.handleSaveData} title={this.state.story.title} /> 
    } else {
      const answers = ReactHtmlParser(this.loadAnswers());
      content = <Display text={answers} title={this.state.story.title}/> 
    }
    console.log(this.state.ref);
    return (
      <div className="App">
      <div className="wrapper">
          {content}
          <Footer {...this.state.ref} />
      </div>
      </div>
    )
       

  }
}

export default App;
