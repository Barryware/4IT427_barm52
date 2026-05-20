interface FilmCardProps {
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  onToggleWatched: (title: string) => void;
}

function FilmCard({
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
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
      <button onClick={() => onToggleWatched(title)}>Změnit stav zhlédnutí</button>
    </div>
  );
}

export default FilmCard;
