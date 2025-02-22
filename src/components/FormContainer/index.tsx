'use client';

import { useActionState, useCallback, useEffect, useReducer } from 'react';

import { initialState } from '../../app/sever-functions/handle-form-submit/constants';
import handleFormSubmit, {
  type CardName,
  type FormState,
  type MaybeWithError,
} from '../../app/sever-functions/handle-form-submit/handle-form-submit';

import FormInner from '../FormInner';

type CardClickAction =
  | { type: 'ADD_CARD'; card: CardName }
  | { type: 'REMOVE_CARD'; card: CardName }
  | { type: 'SET_CARDS'; card: CardName[] };

export default function FormContainer() {
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
          return action satisfies never;
        }
      }
    },
    initialState.selectedCards,
  );

  const [formState, formAction, isPending] = useActionState<MaybeWithError<FormState>, FormData>(
    handleFormSubmit.bind(null, selectedCards),
    initialState,
  );

  useEffect(() => {
    setSelectedCards({ type: 'SET_CARDS', card: formState.selectedCards });
  }, [formState]);

  const handleCardSelectionChange = useCallback(
    (card: CardName) => {
      if (selectedCards.includes(card)) {
        setSelectedCards({ type: 'REMOVE_CARD', card });
      } else {
        setSelectedCards({ type: 'ADD_CARD', card });
      }
    },
    [selectedCards],
  );

  return (
    <>
      <pre>{JSON.stringify(formState, null, 4)}</pre>
      <FormInner
        formState={formState}
        selectedCards={selectedCards}
        isPending={isPending}
        formAction={formAction}
        onCardSelectionChange={handleCardSelectionChange}
      />
    </>
  );
}
