'use client';

import { css } from '../../../styled-system/css';
import handleFormSubmit from '../../app/sever-functions/handle-form-submit/handle-form-submit';
import { useActionState, Fragment, useReducer, useEffect } from 'react';

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

type CardName = `test${number}`;

type FormState = {
  score: number;
  revealedCards: CardName[];
  selectedCards: CardName[];
};

type MaybeWithError<T> = T & {
  errorMessage?: string;
};

type CardClickAction =
  | { type: 'ADD_CARD'; card: CardName }
  | { type: 'REMOVE_CARD'; card: CardName }
  | { type: 'SET_CARDS'; card: CardName[] };

// prettier-ignore
const items: CardName[] = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12'];

const initialState: FormState = {
  score: 0,
  revealedCards: ['test1', 'test2', 'test8', 'test12'],
  selectedCards: [],
};

export default function FormWrapper() {
  const [selectedCards, setSelectedCards] = useReducer(
    (currentState: CardName[], action: CardClickAction) => {
      const { card, type } = action;

      switch (type) {
        case 'ADD_CARD': {
          if (currentState.length >= 2) {
            return currentState;
          }
          return [...currentState, card];
        }
        case 'REMOVE_CARD': {
          if (!currentState.length) {
            return [];
          }
          return currentState.filter((currentCard) => currentCard !== card);
        }
        case 'SET_CARDS': {
          return card;
        }
        default: {
          return currentState;
        }
      }
    },
    initialState.selectedCards,
  );

  const [state, formAction, isPending] = useActionState<MaybeWithError<FormState>, FormData>(
    handleFormSubmit.bind(null, selectedCards),
    initialState,
  );

  // todo: replace with selectedCards as key in parent component
  useEffect(() => {
    setSelectedCards({ type: 'SET_CARDS', card: state.selectedCards });
  }, [state]);

  const hasError = Object.hasOwn(state, 'errorMessage') && state.errorMessage !== undefined;

  return (
    <>
      <pre>{JSON.stringify(state, null, 4)}</pre>
      <form aria-label="Logic test form" action={formAction} className={form} inert={isPending}>
        {items.map((item) => {
          const isRevealed = state.revealedCards.includes(item);
          const isSelected = selectedCards.includes(item);

          return (
            <Fragment key={item}>
              {isRevealed ? (
                <label className={cardLabel}>
                  <input type="radio" name={item} defaultChecked />
                  <span>{item}</span>
                </label>
              ) : (
                <button
                  type="button"
                  name={item}
                  className={cardButton}
                  aria-pressed={isSelected}
                  onClick={() =>
                    isSelected
                      ? setSelectedCards({ type: 'REMOVE_CARD', card: item })
                      : setSelectedCards({ type: 'ADD_CARD', card: item })
                  }
                >
                  {item}
                </button>
              )}
            </Fragment>
          );
        })}

        {hasError ? <p role="alert">{state.errorMessage}</p> : null}

        <button className={submitButton} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
