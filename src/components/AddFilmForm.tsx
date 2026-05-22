import { useState, type FormEvent } from 'react';
import { useWatchlist } from '../context/WatchlistContext';

function AddFilmForm() {
  const { addFilm } = useWatchlist();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
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
    setYear('');
    setGenre('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Přidat film</h3>

      <div>
        <label>
          Název filmu
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Např. Matrix"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Rok
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="2024"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Žánr
          <input
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Sci-Fi"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Hodnocení (1–10)
          <input
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            placeholder="8"
            required
          />
        </label>
      </div>

      <button type="submit">Přidat film</button>
    </form>
  );
}

export default AddFilmForm;
