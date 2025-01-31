'use client';

import { Fragment } from 'react';
import { form, cardLabel, cardButton, submitButton } from './styles';
import type {
  FormState,
  MaybeWithError,
  CardName,
} from '../../app/sever-functions/handle-form-submit/handle-form-submit';
import { items } from '../../app/sever-functions/handle-form-submit/constants';

type FormInnerProps = {
  formState: MaybeWithError<FormState>;
  selectedCards: CardName[];
  isPending: boolean;
  formAction: (payload: FormData) => void;
  onCardSelectionChange: (card: CardName) => void;
};

export default function FormInner({
  formState,
  selectedCards,
  isPending,
  formAction,
  onCardSelectionChange,
}: FormInnerProps) {
  const hasError = Object.hasOwn(formState, 'errorMessage') && formState !== undefined;

  return (
    <form className={form} action={formAction} inert={isPending} aria-label="Logic test form">
      {items.map((item) => {
        const isRevealed = formState.revealedCards.includes(item);
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
                onClick={() => onCardSelectionChange(item)}
              >
                {item}
              </button>
            )}
          </Fragment>
        );
      })}

      {hasError ? <p role="alert">{formState.errorMessage}</p> : null}

      <button className={submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
