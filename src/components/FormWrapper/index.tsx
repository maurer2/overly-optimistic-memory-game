'use client';

import { css } from '../../../styled-system/css';
import handleFormSubmit from '../../app/sever-functions/handle-form-submit/handle-form-submit';
import { useActionState, useState } from 'react';

const form = css({
  display: 'grid',
  gap: '1.25rem',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',

  '&[inert]': {
    opacity: 0.5,
  },
});

const label = css({
  display: 'flex',
  gap: '0.65rem',
});

const button = css({
  display: 'block',
  border: '4px solid currentColor',
  width: 'fit-content',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
  padding: '0.5lh 1lh',
  color: 'var(--indian-red)',
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

const items: CardName[] = [
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
  'test6',
  'test7',
  'test8',
  'test9',
  'test10',
  'test11',
  'test12',
];

const initialState: FormState = {
  score: 0,
  revealedCards: ['test1', 'test2', 'test8'],
  selectedCards: [],
};

const submitAction = async (
  selectedCards: FormState['selectedCards'],
  prevState: MaybeWithError<FormState>,
  formData: FormData,
): Promise<MaybeWithError<FormState>> => {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  setTimeout(() => {
    const revealedCards = Array.from(formData.keys()) as FormState['revealedCards'];

    const newState = {
      score: 0,
      revealedCards,
      selectedCards,
      ...(selectedCards.length !== 2 && { errorMessage: 'Two cards need to be selected' }),
    } satisfies MaybeWithError<FormState>;

    console.log(formData);

    resolve(newState);
  }, 1500);

  return promise;
};

export default function FormWrapper() {
  const [selectedCards, setSelectedCards] = useState<CardName[]>(['test11', 'test12']);
  // const [selectedCards, setSelectedCards] = useState<CardName[]>([]);

  const submitActionWithSelectedCards = submitAction.bind(null, selectedCards);

  const [state, formAction, isPending] = useActionState<MaybeWithError<FormState>, FormData>(
    submitActionWithSelectedCards,
    initialState,
  );

  const hasError = Object.hasOwn(state, 'errorMessage') && state.errorMessage !== undefined;

  return (
    <>
      <pre>{JSON.stringify(state, null, 4)}</pre>
      <form aria-label="Test form" action={formAction} className={form} inert={isPending}>
        {items.map((item) => {
          const isRevealed = state.revealedCards.includes(item);

          return (
            <label key={item} className={label}>
              <input
                type={isRevealed ? 'radio' : 'checkbox'}
                name={item}
                defaultChecked={isRevealed}
              />
              <span>{item}</span>
            </label>
          );
        })}

        {hasError ? <p role="alert">{state.errorMessage}</p> : null}

        <button className={button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
