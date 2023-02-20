import { DisneyCharacter } from "../disney_character";
import { useFavourites } from "../fav_char_context";

interface CharacterProps {
  character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  
  const { favourites, toggleFavourites } = useFavourites();

  return (
    <article className="card">
      <h2>{character.name}</h2>

      <div
        className="card__actions"
        onClick={() => toggleFavourites(character)}
      >
        {!favourites.includes(character) ? "Add to favourites" : "Favourite"}
      </div>

      <img className="card__img" src={character.imageUrl} alt={character.name} />
    </article>
  );
};

export default Character;
