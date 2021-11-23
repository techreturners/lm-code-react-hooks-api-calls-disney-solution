import { useFavourites, useFavouritesUpdate } from '../context/FavouritesContext';

function Character({character}) {

    const favourites = useFavourites();
    const toggleFavourites = useFavouritesUpdate();

    // Image URL needs processing
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if(character.imageUrl) {
        imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
    }
    console.log("Rendering");
    console.log(favourites);
    const isFavourite = favourites.includes(character._id);

    return (
      <article className="character-item">
          <div>
            <h1>{character.name}</h1>
          </div>
          <div className="character-actions" onClick={() => toggleFavourites(character._id)}>
            {isFavourite ? 'Favourited' : 'Add to Favourites'}
          </div>
          <div>
            <img src={imageSrc} alt={character.name} />
          </div>
          
      </article>
    )
  }
  
  export default Character