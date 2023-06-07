enum sortCriteria {
  latest = 'timestamp',
  highest = 'startingPrice',
}
export class SearchOptionDto {
  sortBy: sortCriteria | null;
  skip: number | null;
  take: number | null;
}
