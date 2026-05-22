import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import styles from './AddFilmForm.module.css';

function AddFilmForm() {
  const { addFilm } = useWatchlist();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(String(currentYear));
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addFilm({
      title: title.trim(),
      year: Number(year),
      genre: genre.trim(),
      rating: Number(rating),
    });

    setTitle('');
    setYear(String(currentYear));
    setGenre('');
    setRating('');

    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Přidat film</h3>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="film-title">
          Název filmu
        </label>
        <input
          id="film-title"
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Např. Matrix"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="film-year">
          Rok
        </label>
        <input
          id="film-year"
          className={styles.input}
          type="number"
          min={1900}
          max={2100}
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder={String(currentYear)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="film-genre">
          Žánr
        </label>
        <input
          id="film-genre"
          className={styles.input}
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          placeholder="Sci-Fi"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="film-rating">
          Hodnocení (1–10)
        </label>
        <input
          id="film-rating"
          className={styles.input}
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          placeholder="8"
          required
        />
      </div>

      <button className={styles.button} type="submit">
        Přidat film
      </button>
    </form>
  );
}

export default AddFilmForm;
