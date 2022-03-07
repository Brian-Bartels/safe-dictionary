import './App.css';
import React from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Search for a Word
        </p>
      </header>
      <NameForm/>
    </div>
  );
}

function NameForm() {
  const [val, setVal] = React.useState("");
  const [response, setResponse] = React.useState();

  const handleChange = React.useCallback((event) => {
    setVal(event.target.value);
  }, [setVal]);

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`).then(function(result) {
      setResponse(result);
    }).catch(function (error) {
      // handle error
      setResponse("Not A Word");
    });
    // TODO: response gets double set at undeinfed
  }, [val, setResponse]);


  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="word" value={val} onChange={handleChange} />
        <input type="submit" value="search" />
      </form>
      <ResponseArea response={response}/>
    </>
  );
}

function ResponseArea(props) {
  if (props.response) {
    if (typeof(props.response) === 'string') {
      return (<p>Not A Word</p>);
    }
    const words = props.response.data;
    return (
      <ul>
        {words.map((word, index) => {
          return <Word word={word}/>
        })}
      </ul>
    )
  }
  return null;
}

function Word(props) {
  if (props.word) {
    return (
      <>
        <ul>
          {props.word.meanings.map((meaning, index) => {
            return <Meaning meaning={meaning}/>;
          })}
        </ul>
      </>
    )
  }
  return null;
}

function Meaning(props) {
  if (props.meaning) {
    return (
      <>
        <p>{`Part Of Speech: ${props.meaning.partOfSpeech}`}</p>
        <ul>
          {props.meaning.definitions.map((def, index) => {
            return <p>{def.definition}</p>;
          })}
        </ul>
      </>
  
    )
  }
  return null;
}

export default App;
