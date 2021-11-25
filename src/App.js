
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import { FavouritesProvider } from './context/FavouritesContext';
import Navigation from './components/Navigation';

function App() {

  // Maybe make use of useContext for a collection of 
  // favourite characters
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getCharacters = async (pageNumber) => {

    // Utilised Axios for API calls
    const characterResults = await axios.get(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    setCharacters(characterResults.data.data);
  };

  // These two useEffect's could be combined into one
  // They are split out so that it outlines how the dependencies
  // operate.
  // This is called on first load
  useEffect(() => {
    getCharacters(1);
  }, []);

  // Side effect of current page changing is
  // to fetch the next page of Disney character data
  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  return (
    <div className="page">
      <FavouritesProvider>
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} />
      </FavouritesProvider>
    </div>
  );
}

export default App;
