import { describe, it, expect } from 'vitest';
import { filterFilmsByTitle, calculateAverageRating } from './filmUtils';
import type { Film } from '../types/film.types';

const sampleFilms: Film[] = [
  { id: '1', title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, watched: true },
  { id: '2', title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8, watched: false },
  { id: '3', title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 10, watched: true },
];

describe('filterFilmsByTitle', () => {
  it('vrátí filmy obsahující hledaný text (case-insensitive)', () => {
    const result = filterFilmsByTitle(sampleFilms, 'matrix');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('The Matrix');
  });

  it('při prázdném hledaném výrazu vrátí všechny filmy', () => {
    const result = filterFilmsByTitle(sampleFilms, '');
    expect(result).toEqual(sampleFilms);
  });

  it('ignoruje mezery na začátku a konci hledaného výrazu', () => {
    const result = filterFilmsByTitle(sampleFilms, '  inception  ');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Inception');
  });
});

describe('calculateAverageRating', () => {
  it('správně spočítá průměrné hodnocení', () => {
    expect(calculateAverageRating(sampleFilms)).toBe(9);
  });

  it('vrátí 0 pro prázdné pole', () => {
    expect(calculateAverageRating([])).toBe(0);
  });
});
