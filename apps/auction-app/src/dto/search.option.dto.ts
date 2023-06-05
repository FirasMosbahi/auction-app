enum sortCriteria {
  latest = 'latest',
  highest = 'highest',
}
export class SearchOptionDto {
  sortBy: sortCriteria | null;
  skip: number | null;
  take: number | null;
  completed: boolean;
}
