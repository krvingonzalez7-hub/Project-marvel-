export default function FallbackImage({ src, alt, className }) {
  const handleError = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === 'true') return;

    image.dataset.fallbackApplied = 'true';
    image.src = `${import.meta.env.BASE_URL}images/placeholder.svg`;
  };

  return <img src={src} alt={alt} className={className} onError={handleError} />;
}
