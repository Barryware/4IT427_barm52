import FilmCard from './components/FilmCard';
import { useWatchlist } from './hooks/useWatchlist';
import type { Film } from './types/film.types';

const initialFilms: Film[] = [
  { title: 'Harry Potter a Kámen mudrců', year: 2001, genre: 'Fantasy', rating: 10, watched: true },
  { title: 'Harry Potter a Tajemná komnata', year: 2002, genre: 'Fantasy', rating: 9, watched: true },
  { title: 'Harry Potter a vězeň z Azkabanu', year: 2004, genre: 'Fantasy', rating: 9, watched: true },
  { title: 'Harry Potter a Ohnivý pohár', year: 2005, genre: 'Fantasy', rating: 8, watched: true },
  { title: 'Harry Potter a Fénixův řád', year: 2007, genre: 'Fantasy', rating: 10, watched: true },
  { title: 'Harry Potter a Princ dvojí krve', year: 2009, genre: 'Fantasy', rating: 8, watched: true },
  { title: 'Harry Potter a Relikvie smrti - část 1', year: 2010, genre: 'Fantasy', rating: 9, watched: true },
  { title: 'Harry Potter a Relikvie smrti - část 2', year: 2011, genre: 'Fantasy', rating: 9, watched: true },
];

function App() {
  const { films, toggleWatched, markAllAsWatched } = useWatchlist(initialFilms);

  return (
    <div>
      <h1>Můj watchlist</h1>
      <button onClick={markAllAsWatched}>Označit vše jako zhlédnuté</button>
      {films.map((film) => (
        <FilmCard
          key={film.title}
          title={film.title}
          year={film.year}
          genre={film.genre}
          rating={film.rating}
          watched={film.watched}
          onToggleWatched={toggleWatched}
        />
      ))}
    </div>
  );
}

export default App;
