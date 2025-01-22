import { css } from '../../styled-system/css';
import Card from '../components/Card';
import handleFormSubmit from './sever-functions/handle-form-submit/handle-form-submit';

const container = css({
  padding: '2.5rem',
});

const list = css({
  display: 'grid',
  gap: '2.5rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(8.5rem, 1fr))',
  marginBottom: '2.5rem',

  '& > li': {
    display: 'contents',
  },
});

const button = css({
  border: '4px solid currentColor',
  padding: '0.625rem 1.25rem',
  color: 'var(--indian-red)',
  cursor: 'pointer',
});

export default function Home() {
  return (
    <main className={container}>
      <form aria-label="Memory cards" action={handleFormSubmit}>
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
        <button className={button} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
