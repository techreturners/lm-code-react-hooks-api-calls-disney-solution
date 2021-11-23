import { useFavourites, useFavouritesUpdate } from '../context/FavouritesContext';

function Character({ character }) {

  const favourites = useFavourites();
  const toggleFavourites = useFavouritesUpdate();

  // Image URL needs processing
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
  }

  const isFavourite = favourites.includes(character._id);

  return (
    <article className="character-item">

        <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavourites(character._id)}>
        {isFavourite ? 'Favourited' : 'Add to Favourites'}
      </div>

        <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}

export default Character