'use client';

import { css } from '../../../styled-system/css';
import { RectangleEllipsis } from 'lucide-react';
import { DynamicIcon, type dynamicIconImports } from 'lucide-react/dynamic';
import React from 'react';

type CardProps = {
  name: keyof typeof dynamicIconImports;
  isDebug?: boolean;
};

const card = css({
  transform: 'scale(1)',
  aspectRatio: '1 / 1',
  border: 'var(--indian-red) 4px solid',
  marginTop: '2.5rem',
  padding: '1.25rem',
  color: 'var(--indian-red)',
  opacity: 1,
  transition: 'transform 0.25s ease-in-out, opacity 0.25s ease-in-out',
  cursor: 'pointer',

  '&:is(:hover, :focus-visible)': {
    outline: 'none',
    color: 'var(--space-cadet)',
    backgroundClip: 'content-box',
    backgroundColor: 'rgb(from var(--indian-red) r g b / 85%)',
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

function Card({ name, isDebug }: CardProps) {
  const handleClick = () => {};

  return (
    <button className={card} onClick={handleClick} aria-label="Card">
      <DynamicIcon
        className={icon}
        name={name}
        fallback={() => <RectangleEllipsis className={icon} />}
        aria-hidden
      />
      {isDebug ? <span>{name}</span> : null}
    </button>
  );
}

export default Card;
