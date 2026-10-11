import { sourceCatalog } from '../data/characters';
import FallbackImage from './FallbackImage';

const adaptationsByMedium = ['Película', 'Serial cinematográfico', 'Serie', 'Serie de acción real', 'Película animada', 'Serie animada', 'Videojuego'];

function getSources(sourceIds = []) {
  return sourceIds.map((id) => sourceCatalog[id]).filter(Boolean);
}

function SourceLinks({ sourceIds = [], compact = false }) {
  const sources = getSources(sourceIds);
  if (!sources.length) return null;

  return (
    <div className={`source-links${compact ? ' source-links--compact' : ''}`}>
      {sources.map((source) => (
        <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
          {compact ? 'Fuente' : source.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function DetailSection({ title, children, className = '' }) {
  return (
    <section className={`detail-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function DetailList({ items }) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AdaptationSection({ adaptations }) {
  if (!adaptations?.length) return null;

  return (
    <DetailSection title="Adaptaciones destacadas" className="detail-section--adaptations">
      <div className="adaptation-groups">
        {adaptationsByMedium.map((medium) => {
          const entries = adaptations.filter((adaptation) => adaptation.medium === medium);
          if (!entries.length) return null;

          return (
            <section className="adaptation-group" key={medium}>
              <h3>{medium}</h3>
              <div className="adaptation-grid">
                {entries.map((adaptation) => (
                  <article
                    className="adaptation-card"
                    key={`${adaptation.title}-${adaptation.year}-${adaptation.version}`}
                  >
                    <p className="adaptation-card__title">
                      {adaptation.title} <span>({adaptation.year})</span>
                    </p>
                    <p className="adaptation-card__version">{adaptation.version}</p>
                    <p className="adaptation-card__role">{adaptation.role}</p>
                    <SourceLinks sourceIds={adaptation.sourceIds} compact />
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </DetailSection>
  );
}

export default function CharacterDetail({ character, onBack }) {
  const adaptations = character.adaptations ?? [];

  return (
    <main className="character-detail">
      <div className="detail-topline">
        <button type="button" className="back-button" onClick={onBack}>
          <span aria-hidden="true">←</span> Volver al catálogo
        </button>
        <p className="detail-breadcrumb">PERSONAJES <span>/</span> {character.name}</p>
      </div>

      <header className="detail-hero">
        <div className="detail-hero__image-wrap">
          <FallbackImage src={character.image} alt={character.name} className="detail-hero__image" />
          <span className="detail-hero__image-caption">ARCHIVO DE PERSONAJE</span>
        </div>
        <div className="detail-hero__copy">
          <p className="eyebrow">Expediente · Universo Marvel</p>
          <h1>{character.name}</h1>
          <p className="detail-hero__real-name">{character.realName}</p>
          <p className="detail-hero__summary">{character.summary}</p>
          <div className="detail-traits" aria-label="Rasgos principales">
            {character.occupation && <span>{character.occupation}</span>}
          </div>
        </div>
      </header>

      <div className="detail-grid">
        <DetailSection title="Identidad">
          <dl className="basic-data-list">
            <div>
              <dt>Nombre real / identidad</dt>
              <dd>{character.realName}</dd>
            </div>
            {character.aliases?.length > 0 && (
              <div>
                <dt>Nombres alternativos</dt>
                <dd>{character.aliases.join(', ')}</dd>
              </div>
            )}
            {character.occupation && (
              <div>
                <dt>Ocupación</dt>
                <dd>{character.occupation}</dd>
              </div>
            )}
            <div>
              <dt>Origen</dt>
              <dd>{character.origin}</dd>
            </div>
          </dl>
          <p className="comic-debut">
            <strong>Primera aparición en cómics:</strong> {character.comicDebut.title} ({character.comicDebut.year})
          </p>
          <SourceLinks sourceIds={character.comicDebut.sourceIds} compact />
        </DetailSection>

        <DetailSection title="Origen e historia por continuidad" className="detail-section--versions">
          <div className="version-grid">
            {character.versions.map((version) => (
              <article className="version-card" key={version.name}>
                <p className="version-card__label">{version.name}</p>
                <p className="version-card__continuity">{version.continuity}</p>
                <p className="version-card__story">{version.story}</p>
                <SourceLinks sourceIds={version.sourceIds} compact />
              </article>
            ))}
          </div>
        </DetailSection>

        <AdaptationSection adaptations={adaptations} />

        {character.powers?.length > 0 && (
          <DetailSection title="Poderes, habilidades y equipo">
            <DetailList items={character.powers} />
          </DetailSection>
        )}
        {character.personality && (
          <DetailSection title="Personalidad y motivaciones">
            <p>{character.personality}</p>
          </DetailSection>
        )}
        {character.weaknesses?.length > 0 && (
          <DetailSection title="Limitaciones y debilidades">
            <DetailList items={character.weaknesses} />
          </DetailSection>
        )}

        {character.relationships?.length > 0 && (
          <DetailSection title="Relaciones">
            <div className="relationship-list">
              {character.relationships.map((relationship) => (
                <article className="relationship-item" key={`${relationship.person}-${relationship.continuity}`}>
                  <div className="relationship-item__heading">
                    <h3>{relationship.person}</h3>
                    <span>{relationship.type}</span>
                  </div>
                  <p className="relationship-item__continuity">{relationship.continuity}</p>
                  <p>{relationship.detail}</p>
                  {relationship.sourceIds && <SourceLinks sourceIds={relationship.sourceIds} compact />}
                </article>
              ))}
            </div>
          </DetailSection>
        )}

        {character.teams?.length > 0 && (
          <DetailSection title="Equipos y afiliaciones">
            <div className="team-list">
              {character.teams.map((team) => (
                <article className="team-item" key={`${team.name}-${team.continuity}`}>
                  <div className="relationship-item__heading">
                    <h3>{team.name}</h3>
                    <span>{team.continuity}</span>
                  </div>
                  <p>{team.participation}</p>
                  {team.sourceIds && <SourceLinks sourceIds={team.sourceIds} compact />}
                </article>
              ))}
            </div>
          </DetailSection>
        )}

        {character.curiosities?.length > 0 && (
          <DetailSection title="Datos destacados">
            <div className="curiosity-list">
              {character.curiosities.map((item) => (
                <article className="curiosity-item" key={item.text}>
                  <p>{item.text}</p>
                  <SourceLinks sourceIds={item.sourceIds} compact />
                </article>
              ))}
            </div>
          </DetailSection>
        )}

        <DetailSection title="Fuentes consultadas" className="detail-section--sources">
          <p className="detail-source-note">
            Las referencias secundarias ayudan a localizar datos; las sinopsis de Sony son fuentes
            del estudio para las películas indicadas. Cada adaptación enlaza con su referencia.
          </p>
          <ul className="source-list">
            {getSources(character.sourceIds).map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
                <span>{source.kind}</span>
              </li>
            ))}
          </ul>
        </DetailSection>
      </div>
    </main>
  );
}
