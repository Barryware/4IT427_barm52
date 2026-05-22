import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Film } from '../types/film.types';
import { fetchFilms } from '../api/films';

interface WatchlistContextValue {
  films: Film[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  addFilm: (film: Omit<Film, 'id' | 'watched'>) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (id: string) => void;
  markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

const FILMS_QUERY_KEY = ['films'] as const;

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const {
    data: films = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: FILMS_QUERY_KEY,
    queryFn: fetchFilms,
  });

  const updateFilms = (updater: (current: Film[]) => Film[]) => {
    queryClient.setQueryData<Film[]>(FILMS_QUERY_KEY, (current) => updater(current ?? []));
  };

  const addFilm = (filmData: Omit<Film, 'id' | 'watched'>) => {
    updateFilms((current) => [
      ...current,
      {
        ...filmData,
        id: Date.now().toString(),
        watched: false,
      },
    ]);
  };

  const removeFilm = (id: string) => {
    updateFilms((current) => current.filter((film) => film.id !== id));
  };

  const toggleWatched = (id: string) => {
    updateFilms((current) =>
      current.map((film) => (film.id === id ? { ...film, watched: !film.watched } : film))
    );
  };

  const markAllAsWatched = () => {
    updateFilms((current) => current.map((film) => ({ ...film, watched: true })));
  };

  useEffect(() => {
    const watchedCount = films.filter((film) => film.watched).length;
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;
  }, [films]);

  return (
    <WatchlistContext.Provider
      value={{
        films,
        isLoading,
        isError,
        refetch,
        addFilm,
        removeFilm,
        toggleWatched,
        markAllAsWatched,
      }}
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
