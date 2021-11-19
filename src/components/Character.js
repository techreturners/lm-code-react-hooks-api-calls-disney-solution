function Character({character}) {

    // Image URL needs processing
    const processedUrl = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
    return (
      <article>
          <h1>{character.name}</h1>
          <img src={processedUrl} alt={character.name} />
      </article>
    )
  }
  
  export default Character