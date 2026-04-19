import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes" className={css.navigationLink}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
