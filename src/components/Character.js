import { useContext } from 'react';
import { FavouritesContext } from '../App';

function Character({character}) {

    const favourites = useContext(FavouritesContext);

    // Image URL needs processing
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if(character.imageUrl) {
        imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
    }
    
    const isFavourite = favourites.includes(character._id);

    return (
      <article className="character-item">
          <div>
            <h1>{character.name}</h1>
          </div>
          {isFavourite ? 
            <div className="character-actions">Favourited</div> : 
            <div className="character-actions">Add to Favourites</div>
            
          }
          
          <div>
            <img src={imageSrc} alt={character.name} />
          </div>
          
      </article>
    )
  }
  
  export default Character