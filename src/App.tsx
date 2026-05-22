/* Stylingová metoda: CSS Modules */
import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import WatchlistPage from './pages/WatchlistPage';
import AddFilmPage from './pages/AddFilmPage';
import styles from './App.module.css';

function App() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  return (
    <div className={styles.app}>
      <header className={styles.hero}>
        <h1 className={styles.title}>🎬 Můj filmový watchlist</h1>
        <button className={styles.themeButton} onClick={toggleTheme}>
          {isDark ? '☀️ Světlý režim' : '🌙 Tmavý režim'}
        </button>
      </header>

      <nav className={styles.nav}>
        <NavLink to="/" end className={navLinkClass}>
          Můj watchlist
        </NavLink>
        <NavLink to="/form" className={navLinkClass}>
          Přidat film
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/form" element={<AddFilmPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
