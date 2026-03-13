import Link from 'next/link';
import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" style={{ marginTop: '1rem', display: 'inline-block', color: 'blue', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
