import { Entity, EntityRange } from '../../models';
import { sortBy } from '../../utils';
import { AdvancedSearchStore } from '../advanced-search';
import { AdvancedSearchStateKey } from '../state.model';

export function setFilteredEntities(
  entities: Entity[],
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
): Entity[] {
  const filteredEntities = entities.filter(entity => isEntityInRange(entity, advancedSearchStore));
  return sortBy<Entity, 'translationKey'>(
    filteredEntities.map(entity => setEntityByActiveRange(entity, advancedSearchStore)),
    'translationKey',
    advancedSearchStore[AdvancedSearchStateKey.SortDirection](),
  );
}

export function setYears(
  entities: Entity[],
  parentEntity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
) {
  const currentYear = new Date().getFullYear();
  const entityRanges = entities.map(entity => entity.ranges);
  const selectedYear = advancedSearchStore[AdvancedSearchStateKey.SelectedYear];
  let maxYear = currentYear;
  let minYear = currentYear;

  if (entityRanges.length) {
    maxYear = Math.max(...entityRanges.map(ranges => getLastYear(currentYear, ranges)));
    minYear = Math.min(...entityRanges.map(ranges => getFirstYear(maxYear, ranges)));
  }

  if (maxYear === currentYear && minYear === currentYear) {
    maxYear = getLastYear(currentYear, parentEntity.ranges);
    minYear = getFirstYear(maxYear, parentEntity.ranges);
  }

  advancedSearchStore.updateMaxYear(maxYear);
  advancedSearchStore.updateMinYear(minYear);

  if (selectedYear() < minYear) {
    advancedSearchStore.updateSelectedYear(minYear);
  }

  if (selectedYear() > maxYear) {
    advancedSearchStore.updateSelectedYear(maxYear);
  }
}

function getLastYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.slice(-1)[0]?.end ?? defaultYear;
}

function getFirstYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.[0]?.start ?? defaultYear;
}

function isEntityInRange(
  entity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
): boolean {
  const maxYear = advancedSearchStore[AdvancedSearchStateKey.MaxYear];
  const selectedYear = advancedSearchStore[AdvancedSearchStateKey.SelectedYear];

  if (!entity.ranges) {
    return true;
  }

  return entity.ranges.some(range => {
    const start = range.start;
    const end = range.end ?? maxYear();

    return selectedYear() >= start && selectedYear() <= end;
  });
}

function setEntityByActiveRange(
  entity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
): Entity {
  if (!entity.ranges) {
    return entity;
  }

  const selectedYear = advancedSearchStore[AdvancedSearchStateKey.SelectedYear];
  const activeRange = entity.ranges.find(range => {
    const end = range.end ?? Infinity; // Treat open-ended ranges as infinite
    return selectedYear() >= range.start && selectedYear() <= end;
  });

  return {
    ...entity,
    altParentId: activeRange?.altParentId ?? entity.altParentId,
    flags: activeRange?.flags ?? entity.flags,
    imageUrl: activeRange?.imageUrl ?? entity.imageUrl,
    parentId: activeRange?.parentId ?? entity.parentId,
    translationKey: activeRange?.translationKey ?? entity.translationKey,
    type: activeRange?.type ?? entity.type,
  };
}
