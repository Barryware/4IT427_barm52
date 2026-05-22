import AddFilmForm from './components/AddFilmForm';
import FilmCard from './components/FilmCard';
import { useWatchlist } from './context/WatchlistContext';

function App() {
  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();

  const watchedCount = films.filter((film) => film.watched).length;

  return (
    <div>
      <h1>Film Watchlist</h1>
      <p>
        {watchedCount} / {films.length} zhlédnuto
      </p>
      <button onClick={markAllAsWatched}>Označit vše jako zhlédnuté</button>

      <AddFilmForm />

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
  );
}

export default App;
