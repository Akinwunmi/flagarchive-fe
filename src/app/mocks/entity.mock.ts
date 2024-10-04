import { Entity } from '../models';

export const ENTITY_STUB: Entity = {
  baseId: 'abc1DefGhij2klMnopqR',
  id: 'af-com',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg',
  translationKey: 'comoros',
  type: 'country',
};

export const ENTITIES_STUB: Entity[] = [
  {
    baseId: 'abc1DefGhij2klMnopqT',
    id: 'af-cog',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg',
    translationKey: 'republic_of_the_congo',
    type: 'country',
  },
  ENTITY_STUB,
  ENTITY_STUB, // Duplicate so all sorting probabilities are covered in tests
  {
    baseId: 'abc1DefGhij2klMnopqS',
    id: 'af-cod',
    imageUrl:
      // eslint-disable-next-line max-len
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg',
    translationKey: 'democratic_republic_of_the_congo',
    type: 'country',
  },
];
