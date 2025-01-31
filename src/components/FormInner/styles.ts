import { css } from '../../../styled-system/css';

const form = css({
  display: 'grid',
  gap: '1.25rem',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',

  '&[inert]': {
    opacity: 0.5,
  },
});

const cardLabel = css({
  display: 'flex',
  gap: '0.65rem',
});

const cardButton = css({
  display: 'block',
  border: '1px solid currentColor',
  width: 'fit-content',
  padding: '0.25lh 0.5lh',
  color: 'var(--iron-oxide-red)',
  cursor: 'pointer',

  '&[aria-pressed="true"]': {
    color: 'var(--space-cadet)',
    backgroundColor: 'var(--iron-oxide-red)',
  },
});

const submitButton = css({
  display: 'block',
  border: '4px solid currentColor',
  width: 'fit-content',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
  padding: '0.5lh 1lh',
  color: 'var(--iron-oxide-red)',
  fontWeight: 'bold',
  cursor: 'pointer',
});

export { form, cardLabel, cardButton, submitButton };
