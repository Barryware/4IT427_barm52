import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilmCard from './FilmCard';

const defaultProps = {
  id: '1',
  title: 'Inception',
  year: 2010,
  genre: 'Sci-Fi',
  rating: 9,
  watched: false,
  onToggleWatched: () => {},
  onRemove: () => {},
};

describe('FilmCard', () => {
  it('zobrazí název filmu', () => {
    render(<FilmCard {...defaultProps} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('zobrazí rok filmu', () => {
    render(<FilmCard {...defaultProps} />);
    expect(screen.getByText(/2010/)).toBeInTheDocument();
  });

  it('zobrazí badge ✓ Zhlédnuto, pokud watched === true', () => {
    render(<FilmCard {...defaultProps} watched={true} />);
    expect(screen.getByText(/✓ Zhlédnuto/)).toBeInTheDocument();
  });

  it('nezobrazí badge ✓ Zhlédnuto, pokud watched === false', () => {
    render(<FilmCard {...defaultProps} watched={false} />);
    expect(screen.queryByText(/✓ Zhlédnuto/)).not.toBeInTheDocument();
  });

  it('zavolá onToggleWatched s id po kliknutí na tlačítko', async () => {
    const user = userEvent.setup();
    const onToggleWatched = vi.fn();
    render(<FilmCard {...defaultProps} onToggleWatched={onToggleWatched} />);

    await user.click(screen.getByRole('button', { name: /změnit stav zhlédnutí/i }));

    expect(onToggleWatched).toHaveBeenCalledTimes(1);
    expect(onToggleWatched).toHaveBeenCalledWith('1');
  });
});
