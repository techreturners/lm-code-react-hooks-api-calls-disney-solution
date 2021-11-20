function Character({character}) {

    // Image URL needs processing
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if(character.imageUrl) {
        imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
    }
    return (
      <article className="character-item">
          <h1>{character.name}</h1>
          <img src={imageSrc} alt={character.name} />
      </article>
    )
  }
  
  export default Character