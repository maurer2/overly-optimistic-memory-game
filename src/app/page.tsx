import { css } from '../../styled-system/css';
import Card from '../components/Card';
import { ErrorBoundary } from 'react-error-boundary';

const container = css({
  fontSize: '2rem',
  padding: '1rem',
});

const list = css({
  display: 'flex',
  flexWrap: 'wrap',
});

export default function Home() {
  return (
    <main className={container}>
      <h1>Test</h1>

      <ul className={list}>
        <li>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Card name="box" />
          </ErrorBoundary>
        </li>
      </ul>
    </main>
  );
}
