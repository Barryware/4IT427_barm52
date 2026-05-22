import type { Film } from '../types/film.types';

export function filterFilmsByTitle(films: Film[], query: string): Film[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return films;
  }

  return films.filter((film) => film.title.toLowerCase().includes(normalizedQuery));
}

export function calculateAverageRating(films: Film[]): number {
  if (films.length === 0) {
    return 0;
  }

  const sum = films.reduce((acc, film) => acc + film.rating, 0);
  return sum / films.length;
}
