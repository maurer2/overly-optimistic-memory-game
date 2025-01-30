'use server';

type CardName = `test${number}`;

type FormState = {
  score: number;
  revealedCards: CardName[];
  selectedCards: CardName[];
};

type MaybeWithError<T> = T & {
  errorMessage?: string;
};

// const isCardNameArray = (stringArray: string[]): stringArray is CardName[] => {
//   return stringArray.every((item) => item.match(/^test\d+$/));
// };

const isCardName = (name: string): name is CardName => {
  return /^test\d+$/.test(name);
};

export default async function handleFormSubmit(
  selectedCards: FormState['selectedCards'],
  prevState: MaybeWithError<FormState>,
  formData: FormData,
): Promise<MaybeWithError<FormState>> {
  const { promise, resolve } = Promise.withResolvers<FormState>();

  setTimeout(() => {
    console.log(formData);
    // filter out nextjs specific fields like $ACTION_KEY
    const revealedCards = Array.from(formData.keys()).filter(isCardName);

    const newState = {
      score: 0,
      revealedCards,
      selectedCards,
    } satisfies MaybeWithError<FormState>;

    if (selectedCards.length === 0 || selectedCards.length === 2) {
      return resolve(newState);
    }

    const newStateWithError = {
      ...newState,
      errorMessage: 'Two cards or no cards need to be selected',
    } satisfies MaybeWithError<FormState>;

    resolve(newStateWithError);
  }, 500);

  return promise;
}
