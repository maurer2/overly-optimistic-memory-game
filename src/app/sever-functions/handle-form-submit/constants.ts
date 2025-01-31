import type { FormState, CardName } from './handle-form-submit';

export const initialState: FormState = {
  score: 0,
  revealedCards: ['test1', 'test2', 'test8', 'test12'],
  selectedCards: [],
};

export const items: CardName[] = [
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
