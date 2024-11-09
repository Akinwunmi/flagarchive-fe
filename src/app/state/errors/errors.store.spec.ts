import { TestBed } from '@angular/core/testing';

import { ErrorsStateKey } from '../state.model';

import { ErrorsStore } from './errors.store';

describe('ErrorsStore', () => {
  let store: InstanceType<typeof ErrorsStore>;

  beforeEach(() => {
    store = TestBed.inject(ErrorsStore);
  });

  it('should add error', () => {
    const error = 'This is an error';
    store.addError(error);
    store.addError(error);
    expect(store[ErrorsStateKey.All]()).toEqual([error, error]);
  });
});
