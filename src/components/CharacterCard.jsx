import FallbackImage from './FallbackImage';

export default function CharacterCard({ character, index, onSelect }) {
  return (
    <button
      type="button"
      className="character-card"
      onClick={() => onSelect(character.id)}
      aria-label={`Abrir ficha de ${character.name}`}
    >
      <span className="character-card__image-wrap">
        <FallbackImage
          src={character.image}
          alt={character.name}
          className="character-card__image"
        />
        <span className="character-card__number">{String(index).padStart(2, '0')}</span>
        <span className="character-card__action" aria-hidden="true">Ver ficha <span>↗</span></span>
      </span>
      <span className="character-card__content">
        <span className="character-card__name">{character.name}</span>
        {character.realName && <span className="character-card__real-name">{character.realName}</span>}
      </span>
    </button>
  );
}
