
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import { useState, useEffect } from 'react';



function App() {

  // Maybe make use of useContext for a collection of 
  // favourite characters

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    const characterResults = await axios.get('http://api.disneyapi.dev/characters');
    setCharacters(characterResults.data.data);
  }

  return (
    <>
      <Header />
      <CharacterContainer characters={characters} />
    </>
  );
}

export default App;
