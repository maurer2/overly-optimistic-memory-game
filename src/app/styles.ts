import { css } from '../../styled-system/css';

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

export { container, list };
