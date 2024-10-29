import { stringifyDate } from '../../components/createdEvent';

describe('stringifyDate Utility', () => {
  test('formats date and time correctly', () => {
    const date1 = new Date('2024-01-15T14:30:00');
    const date2 = new Date('2024-01-15T16:45:00');

    const [time, date] = stringifyDate(date1, date2);

    expect(time).toBe('14:30 - 16:45');
    expect(date).toBe('15 January 2024');
  });

  test('handles single-digit times', () => {
    const date1 = new Date('2024-01-01T09:05:00');
    const date2 = new Date('2024-01-01T09:45:00');

    const [time, date] = stringifyDate(date1, date2);

    expect(time).toBe('09:05 - 09:45');
    expect(date).toBe('1 January 2024');
  });

  test('handles dates across different months', () => {
    const date1 = new Date('2024-01-31T23:00:00');
    const date2 = new Date('2024-02-01T01:00:00');

    const [time, date] = stringifyDate(date1, date2);

    expect(date).toBe('31 January 2024');
  });

  test('handles dates at midnight', () => {
    const date1 = new Date('2024-01-01T00:00:00');
    const date2 = new Date('2024-01-01T01:00:00');

    const [time] = stringifyDate(date1, date2);

    expect(time).toBe('00:00 - 01:00');
  });

  test('handles all months correctly', () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    months.forEach((month, index) => {
      const date1 = new Date(`2024-${String(index + 1).padStart(2, '0')}-15T12:00:00`);
      const date2 = new Date(`2024-${String(index + 1).padStart(2, '0')}-15T13:00:00`);

      const [_, date] = stringifyDate(date1, date2);
      expect(date).toBe(`15 ${month} 2024`);
    });
  });
});