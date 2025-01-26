'use client';

import { css } from '../../../styled-system/css';
import handleFormSubmit from '../../app/sever-functions/handle-form-submit/handle-form-submit';
import { useActionState } from 'react';

const form = css({
  display: 'grid',
  gap: '1.25rem',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',

  '&[inert]': {
    opacity: 0.5,
  },
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

type FormState2 = {
  score: number;
  revealedCards: `test${number}`[];
  selectedCards: [`test${number}`, `test${number}`];
};

type FormState = Record<`test${number}`, 'on'>;
const initialState: FormState = {
  test1: 'on',
  test3: 'on',
};

const submitAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  const checkedFields = Array.from(formData.keys()) as `test${number}`[];

  // handleFormSubmit(formData);

  console.log('prevState', prevState);

  const newState = Object.fromEntries(
    checkedFields.map((field) => [field, 'on']),
  ) satisfies FormState;

  setTimeout(() => {
    resolve(newState);
  }, 1500);

  return promise;
};

export default function FormWrapper() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitAction,
    initialState,
  );

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>
      <form aria-label="Test form" action={formAction} className={form} inert={isPending}>
        <label>
          <input type="checkbox" name="test1" defaultChecked={state['test1'] === 'on'} />
          <span>Test1</span>
        </label>
        <label>
          <input type="checkbox" name="test2" defaultChecked={state['test2'] === 'on'} />
          <span>Test2</span>
        </label>
        <label>
          <input type="checkbox" name="test3" defaultChecked={state['test3'] === 'on'} />
          <span>Test3</span>
        </label>
        <label>
          <input type="checkbox" name="test4" defaultChecked={state['test4'] === 'on'} />
          <span>Test4</span>
        </label>

        <button className={button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
