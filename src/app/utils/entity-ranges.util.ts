import { EntityRange } from '../models';

export function getActiveRange(year: number, ranges?: EntityRange[]): EntityRange | undefined {
  return ranges?.find(range => {
    const end = range.end ?? Infinity; // Treat open-ended ranges as infinite
    return year >= range.start && year <= end;
  });
}
