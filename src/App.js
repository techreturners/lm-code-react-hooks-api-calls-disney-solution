
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';
import { useState, useEffect, useCallback } from 'react';

function App() {

  // Maybe make use of useContext for a collection of 
  // favourite characters

  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getCharacters = useCallback(async () => {
    const characterResults = await axios.get(`http://api.disneyapi.dev/characters?page=${currentPage}`);
    setCharacters(characterResults.data.data);
  }, [currentPage]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  

  return (
    <>
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </>
  );
}

export default App;
