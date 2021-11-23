
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';
import React, { useState, useEffect } from 'react';

export const FavouritesContext = React.createContext();

function App() {

  // Maybe make use of useContext for a collection of 
  // favourite characters
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);

  const getCharacters = async (pageNumber) => {

    // Utilised Axios for API calls
    const characterResults = await axios.get(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    setCharacters(characterResults.data.data);
  };

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
    <>
      <FavouritesContext.Provider value={favourites}>
        <Header />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer characters={characters} />
      </FavouritesContext.Provider>
    </>
  );
}

export default App;
