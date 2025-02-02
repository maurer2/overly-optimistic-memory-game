'use client';

import React from 'react';
import { RectangleEllipsis } from 'lucide-react';
import { DynamicIcon, type dynamicIconImports } from 'lucide-react/dynamic';

import { card, icon } from './styles';

type CardProps = {
  name: keyof typeof dynamicIconImports;
  isDebug?: boolean;
};

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
