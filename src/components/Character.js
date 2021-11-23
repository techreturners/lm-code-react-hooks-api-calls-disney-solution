
function Character({ character }) {

  // Image URL needs processing
  let imageSrc = "https://picsum.photos/300/200/?blur";

  if (character.imageUrl) {
    imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <h3 className="character-item__actions">
        Add to Favourites
      </h3>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}

export default Character