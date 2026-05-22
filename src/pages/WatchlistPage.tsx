import FilmCard from '../components/FilmCard';
import { useWatchlist } from '../context/WatchlistContext';
import styles from '../App.module.css';

function WatchlistPage() {
  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();
  const watchedCount = films.filter((film) => film.watched).length;

  return (
    <>
      <div className={styles.pageHeader}>
        <span className={styles.stats}>
          {watchedCount} / {films.length} zhlédnuto
        </span>
        <button className={styles.markAllButton} onClick={markAllAsWatched}>
          Označit vše jako zhlédnuté
        </button>
      </div>

      <div className={styles.grid}>
        {films.map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            title={film.title}
            year={film.year}
            genre={film.genre}
            rating={film.rating}
            watched={film.watched}
            onToggleWatched={toggleWatched}
            onRemove={removeFilm}
          />
        ))}
      </div>
    </>
  );
}

export default WatchlistPage;
