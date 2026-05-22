import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Film } from '../types/film.types';

interface WatchlistContextValue {
  films: Film[];
  addFilm: (film: Omit<Film, 'id' | 'watched'>) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (id: string) => void;
  markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

interface WatchlistProviderProps {
  children: ReactNode;
  initialFilms?: Film[];
}

export function WatchlistProvider({ children, initialFilms = [] }: WatchlistProviderProps) {
  const [films, setFilms] = useState<Film[]>(initialFilms);

  const addFilm = (filmData: Omit<Film, 'id' | 'watched'>) => {
    const newFilm: Film = {
      ...filmData,
      id: crypto.randomUUID(),
      watched: false,
    };
    setFilms((prev) => [...prev, newFilm]);
  };

  const removeFilm = (id: string) => {
    setFilms((prev) => prev.filter((film) => film.id !== id));
  };

  const toggleWatched = (id: string) => {
    setFilms((prev) =>
      prev.map((film) => (film.id === id ? { ...film, watched: !film.watched } : film))
    );
  };

  const markAllAsWatched = () => {
    setFilms((prev) => prev.map((film) => ({ ...film, watched: true })));
  };

  useEffect(() => {
    const watchedCount = films.filter((film) => film.watched).length;
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;
  }, [films]);

  return (
    <WatchlistContext.Provider
      value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === null) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
