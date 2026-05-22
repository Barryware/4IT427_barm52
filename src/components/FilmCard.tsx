interface FilmCardProps {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  onToggleWatched: (id: string) => void;
  onRemove: (id: string) => void;
}

function FilmCard({
  id,
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onRemove,
}: FilmCardProps) {
  const isRatingValid = rating >= 1 && rating <= 10;

  return (
    <div>
      <h2>{title}</h2>
      <p>Rok: {year}</p>
      <p>Žánr: {genre}</p>
      <p>⭐ {isRatingValid ? `${rating}/10` : 'Neplatné hodnocení'}</p>
      <p>Zhlédnuto: {watched ? 'Ano' : 'Ne'}</p>
      {watched && <div>✓ Zhlédnuto</div>}
      <button onClick={() => onToggleWatched(id)}>Změnit stav zhlédnutí</button>
      <button onClick={() => onRemove(id)}>Odebrat</button>
    </div>
  );
}

export default FilmCard;
