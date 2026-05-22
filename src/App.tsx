/* Stylingová metoda: CSS Modules */
import { useState } from 'react';
import AddFilmForm from './components/AddFilmForm';
import FilmCard from './components/FilmCard';
import { useWatchlist } from './context/WatchlistContext';
import styles from './App.module.css';

function App() {
  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const watchedCount = films.filter((film) => film.watched).length;

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <header className={styles.hero}>
        <h1 className={styles.title}>🎬 Můj filmový watchlist</h1>
        <div className={styles.headerActions}>
          <button className={styles.themeButton} onClick={toggleTheme}>
            {isDark ? '☀️ Světlý režim' : '🌙 Tmavý režim'}
          </button>
          <button className={styles.markAllButton} onClick={markAllAsWatched}>
            Označit vše jako zhlédnuté
          </button>
        </div>
      </header>

      <span className={styles.stats}>
        {watchedCount} / {films.length} zhlédnuto
      </span>

      <AddFilmForm />

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
    </div>
  );
}

export default App;
