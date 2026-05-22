import styles from './FilmCard.module.css';

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
  const cardClassName = `${styles.card} ${watched ? styles.cardWatched : ''}`;

  return (
    <div className={cardClassName}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.info}>Rok: {year}</p>
      <p className={styles.info}>Žánr: {genre}</p>
      <p className={styles.rating}>
        ⭐ {isRatingValid ? `${rating}/10` : 'Neplatné hodnocení'}
      </p>
      <p className={styles.info}>Zhlédnuto: {watched ? 'Ano' : 'Ne'}</p>
      {watched && <span className={styles.badgeWatched}>✓ Zhlédnuto</span>}
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => onToggleWatched(id)}>
          Změnit stav zhlédnutí
        </button>
        <button
          className={`${styles.button} ${styles.removeButton}`}
          onClick={() => onRemove(id)}
        >
          Odebrat
        </button>
      </div>
    </div>
  );
}

export default FilmCard;
