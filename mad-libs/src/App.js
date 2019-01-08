import React, { Component } from 'react';
import './App.css';
import './styles/styles.css';

import Words from './components/Words';
import Display from './components/Display';

const questions = {
  'color' : 'Color',
  'pluralnoun' : 'Plural Noun',
  'adjective' : 'Adjective',
  'exclamation' : 'Exclamation',
  'sillyword' : 'Silly Word',
  'verb_past' : 'Verb (Past Tense)',
  'verb' : 'Verb',
  'adverb' : 'Adverb',
  'part-of-body' : 'Part of the body',
  'part-of-body-plural':  'Part of the body (plural)',
  'noun' : 'Noun',
  'animal-plural': 'Animal (plural)',
  'place': 'A place',
  'number': 'Number'
}

const madLibText = [{ title: "Little Red Riding Hood", text: 
`One day, Little {{color}} Riding Hood was going through the forest 
carry a basket of {{pluralnoun}} for her grandmother.  Suddenly,
she met a big {{adjective}} wolf. "{{exclamation}}!" said the wolf. 
"Where are you going, little {{sillyword}}?" "I'm going to my
grandmother's house,"  she said.  The the wolf {{verb_past}} away.
When Miss Riding Hood got to her grandmother's house, the wolf was in bed dressed like her grandmother.  "My, Grandmother," she said.  "What big {{pluralnoun}} you have."  "The better to {{verb}} you with,"
said the wolf.  "And, Grandmother," she said, "what big {{pluralnoun}} you have."  The wolf said, "The better to {{verb}} you with."  And then she said, "What big {{pluralnoun}} you have, Grandmother."  But the wolf said nothing.  He had just died of indigestion from eating Grandmother.
`},
{
  title: "Wanted: Parent Chaperones",
  text: `Are you daring, adventurous, and {{adjective}}?  Does the thought of driving in a stuffy, cramped {{noun}} with a bunch
  of loud, boisterous {{pluralnoun}} make your {{part-of-body}} beat with excitement?  Can you picture yourself herding
  rowdy, {{adjective}} children like a pack of pygmy {{animal-plural}}?  If so, then you could be a field trip chaperone!  Join
  our team of ultra-responsible adult {{pluralnoun}} charged with making sure that students walk, not {{verb}}, around a zoo, a musuem, (the) {{place}}, or whatever location their {{adjective}} teacher has selected for the field trip.  While previous experience is not required, candidates who can manage up to {{number}} {{pluralnoun}} at any given time while maintaining a/an
  {{adjective}} sense of humor are preferred.  Those with eyes in the back of their {{part-of-body-plural}} will be given top
  consideration.  And while there's no salary, the joy of seeing {{adjective}} expressions on the kids' {{part-of-body-plural}} as
  they learn something new will be reward enough!  If this sounds like a/an {{adjective}} job, {{verb}} today for an application!
  `
}
];
const placeholderRegEx = RegExp(/\{\{(.*?)\}\}/, 'gi');

function replacePlaceholder(text) {

  return text.replace(placeholderRegEx, '___________');
}



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
     
     let index = 1;
     let story = madLibText[index];

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
    return this.state.story.text.split(/[\s]/).map( (word) => {
      if (placeholderRegEx.test(word)) {
        return word.replace(placeholderRegEx, this.state.inputs[index++].answer);
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
      return (
        <div className="App">
        <Display text={this.loadAnswers()} title={this.state.story.title}/> 
        </div>
      );
    }

  }
}

export default App;
