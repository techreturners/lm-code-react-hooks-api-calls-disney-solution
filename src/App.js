
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Character from './components/Character';
import { useState, useEffect } from 'react';



function App() {

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

      {
        characters.map((character) => (
          <Character key={character._id} character={character} />
        ))
      }
    </>
  );
}

export default App;
