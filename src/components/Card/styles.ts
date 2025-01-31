import { css } from '../../../styled-system/css';

const card = css({
  transform: 'scale(1)',
  aspectRatio: '1 / 1',
  border: 'var(--iron-oxide-red) 4px solid',
  marginTop: '2.5rem',
  padding: '1.25rem',
  color: 'var(--iron-oxide-red)',
  opacity: 1,
  transition: 'transform 0.25s ease-in-out, opacity 0.25s ease-in-out',
  cursor: 'pointer',

  '&:is(:hover, :focus-visible)': {
    outline: 'none',
    color: 'var(--space-cadet)',
    backgroundClip: 'content-box',
    backgroundColor: 'rgb(from var(--iron-oxide-red) r g b / 85%)',
  },

  '@starting-style': {
    transform: 'scale(0.5)',
    opacity: 0.5,
  },
});

const icon = css({
  objectPosition: 'center',
  objectFit: 'contain',
  width: '100%',
  height: '100%',
});

export { card, icon };
