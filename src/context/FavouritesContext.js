
import React, { useState, useContext } from 'react';

const FavouritesContext = React.createContext();
const FavouritesUpdateContext = React.createContext();

export function useFavourites() {
    return useContext(FavouritesContext)
}

export function useFavouritesUpdate() {
    return useContext(FavouritesUpdateContext)
}

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);

    function toggleFavouriteForCharacter(characterId) {
        if(!favourites.includes(characterId)) {
            addFavourite(characterId);
        }
        else {
            removeFavourite(characterId);
        }

        console.log(favourites);
    }

    function addFavourite(characterId) {
        setFavourites([...favourites, characterId]);
        
    }

    function removeFavourite(characterId) {
        const updatedFavourites = favourites.filter((id) => id !== characterId);
        setFavourites(updatedFavourites);
    }

    return (
        <FavouritesContext.Provider value={favourites}>
            <FavouritesUpdateContext.Provider value={toggleFavouriteForCharacter}>
                {children}
            </FavouritesUpdateContext.Provider>
        </FavouritesContext.Provider>
    )
}