'use client'

import { css } from '../../../styled-system/css';
import React from 'react';
import { DynamicIcon, type dynamicIconImports } from 'lucide-react/dynamic';
import { RectangleEllipsis } from 'lucide-react';
import { ErrorBoundary } from "react-error-boundary";

type CardProps = {
  name: keyof typeof dynamicIconImports;
};

const card = css({
  border: 'var(--rebeccapurple) 1px solid',
  background: 'var(--rebeccapurple)',
  padding: '1rem',
});

function Card({ name }: CardProps) {
  const handleClick = () => {};

  return (
  <button className={card} onClick={handleClick}>
    {/* <ErrorBoundary fallback={<p>Something went wrong</p>}> */}
      <DynamicIcon name={name} fallback={() => <RectangleEllipsis />} />
    {/* </ErrorBoundary> */}
  </button>);
}

export default Card;
