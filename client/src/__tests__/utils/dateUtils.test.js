import { stringifyDate } from '../../components/upcomingEvents';

describe('stringifyDate Function', () => {
  test('formats dates and times correctly', () => {
    const date1 = new Date('2024-12-01T14:30:00');
    const date2 = new Date('2024-12-01T16:45:00');

    const [time, date] = stringifyDate(date1, date2);

    expect(time).toBe('14:30 - 16:45');
    expect(date).toBe('1 December 2024');
  });

  test('handles single-digit hours and minutes', () => {
    const date1 = new Date('2024-12-01T09:05:00');
    const date2 = new Date('2024-12-01T09:45:00');

    const [time] = stringifyDate(date1, date2);
    expect(time).toBe('09:05 - 09:45');
  });

  test('handles different months', () => {
    const date1 = new Date('2024-01-01T12:00:00');
    const date2 = new Date('2024-01-01T13:00:00');

    const [_, date] = stringifyDate(date1, date2);
    expect(date).toBe('1 January 2024');
  });

  test('pads hours and minutes with zeros', () => {
    const date1 = new Date('2024-12-01T08:05:00');
    const date2 = new Date('2024-12-01T09:07:00');

    const [time] = stringifyDate(date1, date2);
    expect(time).toBe('08:05 - 09:07');
  });

  test('handles year transition', () => {
    const date1 = new Date('2024-12-31T23:00:00');
    const date2 = new Date('2025-01-01T01:00:00');

    const [_, date] = stringifyDate(date1, date2);
    expect(date).toBe('31 December 2024');
  });
});