## A note on the video solution

After watching the 13 minute video by [Web Dev](https://www.youtube.com/watch?v=5LrDIWkK_Bc) in `activity_4.md`, you will have ended up with some code that looks a bit like this:

```JSX
import React, { useState, useContext } from "react";

// Two separate contexts 
const FavouritesContext = React.createContext<number[]>([]); // <---------- note, this
const FavouritesUpdateContext = React.createContext<(characterId: number) => void>(() => null);// <--- and this!

// With two separate hooks for each
// Hook 1
export function useFavourites() {
    return useContext(FavouritesContext)
}

// Hook 2
export function useFavouritesUpdate() {
    return useContext(FavouritesUpdateContext)
}

export function FavCharacterProvider ({ children } : { children: React.ReactNode }) {

    const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([]);

    const toggleFavourites = (characterId : number) => {
        if (!characterFavourites.includes(characterId)){
            setCharacterFavourites([...characterFavourites, characterId])
        }
        else {
          const updatedFavourites = characterFavourites.filter((id) => id !== characterId);
          setCharacterFavourites(updatedFavourites);
        }
      }

    return(
        // TWO separate contexts wrapped around our children to pass two separate values (our characterFavourites and our toggleFavourites function)
        <FavouritesContext.Provider value={characterFavourites}> // <-------------- note, here
            <FavouritesUpdateContext.Provider value={toggleFavourites}> // <-------------- and here!
            {children}
            </FavouritesUpdateContext.Provider>
        </FavouritesContext.Provider>
    )
}
```


```JSX
import { DisneyCharacter } from "../disney_character";
import { useFavourites, useFavouritesUpdate } from "../FavCharacterContext";

interface CharacterProps{
	character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {

// To access our characterFavourite array and toggleFavourites function we call the two favourite hooks here
  const characterFavourites = useFavourites()
  const toggleFavourites = useFavouritesUpdate()

  return (
    <article className="card">
      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavourites(character._id)}>
        {!characterFavourites.includes(character._id) ? "Add to favourites" : "Favourite"}
        </div>

      <img
        src={character.imageUrl}
        alt={character.name}
      />
    </article>
  );
};

export default Character;







```

## A DRY-er way

This is absolutely valid, and hopefully you got this code to work successfully with the rest of your app.

However, there is another, slightly "D.R.Y-er" (don't repeat yourself!) way of doing the same thing.

Instead of creating a `FavouritesContext` AND a `FavouritesUpdateContext` that you declare, wrap the children with AND create two separate hooks for, we can refactor this to save us some code...

See below for how:

```TypeScript
import React, { useState, useContext } from "react";

// Instead of creating two separate Contexts, we instead create ONE that will hold an object containing BOTH our favourites array and our toggleFavourites function 
const FavouritesContext = React.createContext<{favourites: number[], toggleFavourites: (favs: number) => void}>({ favourites: [], toggleFavourites: () => null});

// We then only need to create one hook
export function useFavourites() {
    return useContext(FavouritesContext)
}

export function FavCharacterProvider ({ children } : { children: React.ReactNode }) {

    const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([]);

    const toggleFavourites = (characterId : number) => {
        if (!characterFavourites.includes(characterId)){
            setCharacterFavourites([...characterFavourites, characterId])
        }
        else {
          const updatedFavourites = characterFavourites.filter((id) => id !== characterId);
          setCharacterFavourites(updatedFavourites);
        }
      }

    return(
        // And instead of wrapping TWO contexts around our children, we wrap ONE context and pass an object with our favourites and toggleFavourites
        <FavouritesContext.Provider value={{favourites: characterFavourites, toggleFavourites: toggleFavourites}}>
            {children}
        </FavouritesContext.Provider>
    )
}
```

## Accessing our Context 

```JSX
import { DisneyCharacter } from "../disney_character";
import { useFavourites } from "../FavCharacterContext";

interface CharacterProps{
	character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {

// We can then pull out both our favourites array and our toggleFavourites function from our useFavourites hook
  const {favourites, toggleFavourites } = useFavourites()

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavourites(character._id)}>
        {!favourites.includes(character._id) ? "Add to favourites" : "Favourite"}
        </div>

      <img
        src={character.imageUrl}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
```
