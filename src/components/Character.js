
function Character({character}) {

    // Image URL needs processing
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if(character.imageUrl) {
        imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
    }
    return (
      <article className="character-item">
          <div>
            <h1>{character.name}</h1>
          </div>
          <div className="character-actions">
            Add to Favourites
          </div>
          <div>
            <img src={imageSrc} alt={character.name} />
          </div>
          
      </article>
    )
  }
  
  export default Character