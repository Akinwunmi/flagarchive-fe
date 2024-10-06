import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subject, throwError } from 'rxjs';

import { ENTITIES_STUB, EntityServiceStub } from '../mocks';
import { Entity, EntityType } from '../models';
import { EntityService } from '../services';

import { AdvancedSearchStore } from './advanced-search.store';
import { EntitiesStore } from './entities.store';
import { AdvancedSearchStateKey, EntitiesStateKey } from './state.model';

describe('EntitiesStore', () => {
  let advancedSearchStore: InstanceType<typeof AdvancedSearchStore>;
  let entitiesStore: InstanceType<typeof EntitiesStore>;
  let entityService: EntityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: EntityService,
          useClass: EntityServiceStub,
        },
      ],
    }).compileComponents();

    advancedSearchStore = TestBed.inject(AdvancedSearchStore);
    entitiesStore = TestBed.inject(EntitiesStore);
    entityService = TestBed.inject(EntityService);
  });

  it('should add entities', fakeAsync(() => {
    const entities$ = new Subject<Entity[]>();
    const entities = ENTITIES_STUB;

    entitiesStore.addEntities(entities$);
    entities$.next(entities);
    tick(50);

    expect(entitiesStore[EntitiesStateKey.All]()).toEqual(ENTITIES_STUB);
  }));

  it('should handle add entities error', fakeAsync(() => {
    const entities$ = new Subject<Entity[]>();
    const entities = ENTITIES_STUB;

    spyOn(entityService, 'addEntities').and.callFake(() => throwError(() => 'error'));

    entitiesStore.addEntities(entities$);
    entities$.next(entities);
    tick(50);

    expect(entitiesStore[EntitiesStateKey.All]()).toEqual([]);
  }));

  it('should get entities', fakeAsync(() => {
    const id$ = new Subject<string>();
    const entity = ENTITIES_STUB.find(entity => entity.id === 'af');
    const id = entity?.id;
    const currentEntities = ENTITIES_STUB.filter(entity => entity.parentId === id);
    if (!id) {
      throw new Error('Entity not found');
    }

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore[EntitiesStateKey.Current]()).toEqual(currentEntities);
    expect(entitiesStore[EntitiesStateKey.SelectedId]()).toEqual(id);
    expect(entitiesStore[EntitiesStateKey.Selected]()).toEqual(entity);
  }));

  it('should handle get entity by id error', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    spyOn(entityService, 'getEntityById').and.callFake(() => throwError(() => 'error'));

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore[EntitiesStateKey.Selected]()).toEqual(undefined);
  }));

  it('should handle get entities by parent id error', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    spyOn(entityService, 'getEntitiesByParentId').and.callFake(() => throwError(() => 'error'));

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore[EntitiesStateKey.Current]()).toEqual([]);
  }));

  it('should update selected year when lower then min year', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    advancedSearchStore.updateSelectedYear(1950);
    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(advancedSearchStore[AdvancedSearchStateKey.SelectedYear]()).toEqual(1963);
  }));

  it('should update selected year when higher then max year', fakeAsync(() => {
    const currentYear = new Date().getFullYear();
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    advancedSearchStore.updateSelectedYear(2030);
    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(advancedSearchStore[AdvancedSearchStateKey.SelectedYear]()).toEqual(currentYear);
  }));

  it('should get main entities', fakeAsync(() => {
    entitiesStore.getMainEntities();
    tick(50);

    expect(entitiesStore[EntitiesStateKey.Main]()).toEqual(
      ENTITIES_STUB.filter(
        entity => entity.type === EntityType.Continent || entity.type === EntityType.Organization,
      ),
    );
  }));

  it('should handle get main entities error', fakeAsync(() => {
    spyOn(entityService, 'getEntitiesByType').and.callFake(() => throwError(() => 'error'));

    entitiesStore.getMainEntities();
    tick(50);

    expect(entitiesStore[EntitiesStateKey.Main]()).toEqual([]);
  }));
});
