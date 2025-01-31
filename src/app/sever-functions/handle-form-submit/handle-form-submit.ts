'use server';

export type CardName = `test${number}`;

export type FormState = {
  score: number;
  revealedCards: CardName[];
  selectedCards: CardName[];
};

export type MaybeWithError<T> = T & {
  errorMessage?: string;
};

// const isCardNameArray = (stringArray: string[]): stringArray is CardName[] => {
//   return stringArray.every((item) => item.match(/^test\d+$/));
// };

const isCardName = (name: string): name is CardName => {
  return /^test\d+$/.test(name);
};

const matchingPairsOfCards: CardName[][] = [
  ['test1', 'test2'],
  ['test8', 'test12'],
  ['test3', 'test4'],
  ['test5', 'test6'],
  // todo: add remaining matches
];

export default async function handleFormSubmit(
  selectedCards: FormState['selectedCards'],
  prevState: MaybeWithError<FormState>,
  formData: FormData,
): Promise<MaybeWithError<FormState>> {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  setTimeout(() => {
    // filter out nextjs specific fields like $ACTION_KEY
    const revealedCards = Array.from(formData.keys()).filter(isCardName);

    const newFormState = {
      score: 0, // todo: calculate score
      revealedCards,
      selectedCards,
    } satisfies MaybeWithError<FormState>;

    if (selectedCards.length === 2) {
      const currentSelectedCardsAsString = selectedCards.toSorted().toString();

      const isSelectedCardsMatching = matchingPairsOfCards.some((pairOfCards) => {
        const pairOfCardsAsString = pairOfCards.toSorted().toString();

        return pairOfCardsAsString == currentSelectedCardsAsString;
      });

      if (isSelectedCardsMatching) {
        const newRevealedCards = [...revealedCards, ...selectedCards];
        const newFormStateWithNewRevealedCards = {
          ...newFormState,
          selectedCards: [],
          revealedCards: newRevealedCards,
        } satisfies MaybeWithError<FormState>;

        return resolve(newFormStateWithNewRevealedCards);
      }

      const newStateWithError = {
        ...newFormState,
        errorMessage: "Selected cards don't match",
      } satisfies MaybeWithError<FormState>;

      return resolve(newStateWithError);
    }

    const newStateWithError = {
      ...newFormState,
      errorMessage: 'Two cards need to be selected',
    } satisfies MaybeWithError<FormState>;

    resolve(newStateWithError);
  }, 500);

  return promise;
}
