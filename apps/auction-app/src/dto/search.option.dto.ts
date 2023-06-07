enum sortCriteria {
  latest = 'timestamp',
  highest = 'actualPrice',
}
export class SearchOptionDto {
  sortBy: sortCriteria | null;
  skip: number | null;
  take: number | null;
}
