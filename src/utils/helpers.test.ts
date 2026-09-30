import {
  getUniqueValuesByKey,
  formatTime,
  getTimePanel,
} from './helpers';
import { TrackType } from '@/sharedTypes/sharedTypes';

const createTrack = (
  overrides: Partial<TrackType> = {},
): TrackType =>
  ({
    _id: '1',
    name: 'Test Track',
    author: 'Test Author',
    genre: ['Rock'],
    release_date: '2024-01-01',
    ...overrides,
  }) as TrackType;

describe('getUniqueValuesByKey', () => {
  it('возвращает уникальных исполнителей', () => {
    const tracks = [
      createTrack({ author: 'The Beatles' }),
      createTrack({ author: 'Queen' }),
      createTrack({ author: 'The Beatles' }),
    ];

    expect(getUniqueValuesByKey(tracks, 'author')).toEqual([
      'The Beatles',
      'Queen',
    ]);
  });

  it('возвращает уникальные значения из массива жанров', () => {
    const tracks = [
      createTrack({ genre: ['Rock', 'Pop'] }),
      createTrack({ genre: ['Pop', 'Jazz'] }),
    ];

    expect(getUniqueValuesByKey(tracks, 'genre')).toEqual([
      'Rock',
      'Pop',
      'Jazz',
    ]);
  });

  it('не добавляет пустые значения', () => {
    const tracks = [
      createTrack({ genre: ['Rock', '', 'Pop'] }),
      createTrack({ genre: [''] }),
    ];

    expect(getUniqueValuesByKey(tracks, 'genre')).toEqual([
      'Rock',
      'Pop',
    ]);
  });

  it('возвращает пустой массив для пустого массива треков', () => {
    expect(getUniqueValuesByKey([], 'author')).toEqual([]);
  });

  it('возвращает пустой массив, если передан undefined', () => {
    expect(getUniqueValuesByKey(undefined, 'author')).toEqual([]);
  });
});

describe('formatTime', () => {
  it('форматирует 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('форматирует секунды меньше минуты', () => {
    expect(formatTime(5)).toBe('0:05');
  });

  it('форматирует ровно одну минуту', () => {
    expect(formatTime(60)).toBe('1:00');
  });

  it('форматирует минуты и секунды', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('форматирует несколько минут', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('округляет дробные секунды вниз', () => {
    expect(formatTime(65.9)).toBe('1:05');
  });
});

describe('getTimePanel', () => {
  it('возвращает время в формате current / total', () => {
    expect(getTimePanel(65, 125)).toBe('1:05 / 2:05');
  });

  it('возвращает undefined, если totalTime не передан', () => {
    expect(getTimePanel(65, undefined)).toBeUndefined();
  });

  it('возвращает undefined, если totalTime равен 0', () => {
    expect(getTimePanel(65, 0)).toBeUndefined();
  });
});