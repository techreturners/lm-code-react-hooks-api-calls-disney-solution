
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import CharacterContainer from './components/CharacterContainer';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';

function App() {

  // Why not make use of useContext for a collection of 
  // favourite characters?

  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="page">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
}

export default App;
