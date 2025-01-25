'use client';

import { css } from '../../../styled-system/css';
import handleFormSubmit from '../../app/sever-functions/handle-form-submit/handle-form-submit';
import { useActionState } from 'react';

const form = css({
  display: 'grid',
  gap: '1.25rem',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
});

const button = css({
  display: 'block',
  border: '4px solid currentColor',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
  padding: '0.625rem 1.25rem',
  color: 'var(--indian-red)',
  cursor: 'pointer',
});

type FormState = Record<`test${number}`, 'on'>;
const initialState: FormState = {
  test1: 'on',
  test3: 'on',
};

const submitAction = async (prevState: unknown, formData: FormData) => {
  console.log(Object.fromEntries(formData));

  return handleFormSubmit(formData);
};

export default function FormWrapper() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitAction,
    initialState,
  );

  return (
    <>
      <p>{isPending.toString()}</p>
      <pre>{JSON.stringify(state)}</pre>
      <form aria-label="Test form" action={formAction} className={form}>
        <label>
          <input type="radio" name="test1" defaultChecked={state['test1'] === 'on'} />
          <span>Test1</span>
        </label>
        <label>
          <input type="radio" name="test2" defaultChecked={state['test2'] === 'on'} />
          <span>Test2</span>
        </label>
        <label>
          <input type="radio" name="test3" defaultChecked={state['test3'] === 'on'} />
          <span>Test3</span>
        </label>
        <label>
          <input type="radio" name="test4" defaultChecked={state['test4'] === 'on'} />
          <span>Test4</span>
        </label>

        <button className={button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
