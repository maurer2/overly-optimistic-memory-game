import { css } from '../../styled-system/css';
import Card from '../components/Card';

const container = css({
  padding: '2.5rem',
});

const list = css({
  display: 'grid',
  gap: '2.5rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(8.5rem, 1fr))',

  '& > li': {
    display: 'contents',
  },
});

export default function Home() {
  return (
    <main className={container}>
      <ul className={list}>
        {Array.from({ length: 12 }, (_, index) => (
          <>
            <li key={`${index}-a`}>
              <Card name="box" />
            </li>
            <li key={`${index}-b`}>
              <Card name="minus" />
            </li>
          </>
        ))}
      </ul>
    </main>
  );
}
