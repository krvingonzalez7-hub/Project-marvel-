import { useEffect, useMemo, useState } from 'react';
import CharacterCard from './components/CharacterCard';
import CharacterDetail from './components/CharacterDetail';
import FallbackImage from './components/FallbackImage';
import { characters } from './data/characters';

function SiteHeader({ onHome }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button type="button" className="brand" onClick={onHome} aria-label="Ir al inicio">
          <span className="brand__mark">MM</span>
          <span className="brand__name">MARVEL <strong>MULTIVERSE</strong></span>
        </button>
        <nav className="main-nav" aria-label="Navegación principal">
          <button type="button" onClick={onHome}>Inicio</button>
          <a href="#catalogo" onClick={onHome}>Personajes</a>
        </nav>
      </div>
    </header>
  );
}

function Catalog({ onSelect, onHome }) {
  return (
    <>
      <SiteHeader onHome={onHome} />
      <main className="catalog-page" id="inicio">
        <section className="hero-banner" aria-label="Presentación de Marvel Multiverse">
          <FallbackImage
            src="/images/banner-marvel.jpg"
            alt="Héroes de Marvel reunidos"
            className="hero-banner__image"
          />
          <div className="hero-banner__shade" />
          <div className="hero-banner__copy">
            <p className="eyebrow">Un catálogo de héroes y leyendas</p>
            <h1>Explora el<br /><span>multiverso</span></h1>
            <a className="hero-banner__cta" href="#catalogo">Ver personajes <span aria-hidden="true">↓</span></a>
          </div>
          <span className="hero-banner__index">MARVEL MULTIVERSE · ARCHIVO 01</span>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Conoce a los protagonistas</p>
              <h2>Personajes <span>destacados</span></h2>
            </div>
            <p className="section-heading__aside">Ocho historias. Un universo en expansión.</p>
          </div>
          <div className="character-grid">
            {characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                index={index + 1}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span className="brand__mark">MM</span>
        <p>Proyecto educativo de fans. Personajes e imágenes pertenecen a sus respectivos titulares.</p>
      </footer>
    </>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const syncSelectionFromHash = () => {
      const hash = window.location.hash.slice(1);
      const nextCharacter = characters.find((character) => character.slug === hash);
      setSelectedId(nextCharacter ? nextCharacter.id : null);
    };

    syncSelectionFromHash();
    window.addEventListener('hashchange', syncSelectionFromHash);
    return () => window.removeEventListener('hashchange', syncSelectionFromHash);
  }, []);

  const selectedCharacter = useMemo(
    () => characters.find((character) => character.id === selectedId) ?? null,
    [selectedId]
  );

  const handleSelectCharacter = (characterId) => {
    const nextCharacter = characters.find((character) => character.id === characterId);
    if (!nextCharacter) return;

    window.location.hash = nextCharacter.slug;
  };

  const handleHome = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedCharacter) {
    return (
      <>
        <SiteHeader onHome={handleHome} />
        <CharacterDetail character={selectedCharacter} onBack={handleHome} />
        <footer className="site-footer">
          <span className="brand__mark">MM</span>
          <p>Proyecto educativo de fans. Personajes e imágenes pertenecen a sus respectivos titulares.</p>
        </footer>
      </>
    );
  }

  return <Catalog onSelect={handleSelectCharacter} onHome={handleHome} />;
}
