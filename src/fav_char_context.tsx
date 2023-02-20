import React, { useState, useContext } from "react";
import { DisneyCharacter } from "./disney_character";

const FavouritesContext = React.createContext<{
  favourites: DisneyCharacter[];
  toggleFavourites: (favs: DisneyCharacter) => void;
  isFavouritesPage: boolean;
  toggleFavouritesPage: () => void;
}>({ favourites: [], toggleFavourites: () => true, isFavouritesPage: false, toggleFavouritesPage: () => false});

export function useFavourites() {
  return useContext(FavouritesContext);
}

export function FavCharacterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [characterFavourites, setCharacterFavourites] = useState<Array<DisneyCharacter>>([]);
  const [isFavouritesPage, setIsFavouritesPage ] = useState<boolean>(false)

  const toggleFavourites = (character: DisneyCharacter) => {
    if (characterFavourites.filter((char) => char._id === character._id).length === 0) {
      // add to favourites
      setCharacterFavourites([...characterFavourites, character]);
    } else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter(
        (favChar) => favChar._id !== character._id
      );
      setCharacterFavourites(updatedFavourites);
    }
  };

  const toggleFavouritesPage = () => {
    setIsFavouritesPage(prevIsFavouritesPage => !prevIsFavouritesPage)
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites: characterFavourites,
        toggleFavourites: toggleFavourites,
        isFavouritesPage: isFavouritesPage,
        toggleFavouritesPage: toggleFavouritesPage,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
