import { formatDateTime } from './dates.ts';

describe('dates', () => {
  it.each([
    [new Date(2023, 1, 1, 1, 1, 1, 1), '01.02.2023 01:01'],
    [new Date(2023, 9, 15, 20, 31, 21, 12), '15.10.2023 20:31'],
  ])(
    'formatDateTime should change %s to %s',
    (date: Date, expectedFormattedDate: string) => {
      expect(formatDateTime(date)).toEqual(expectedFormattedDate);
    },
  );
});
