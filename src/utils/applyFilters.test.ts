import { applyFilters } from './applyFilters';
import { initialStateType } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

const createTrack = (
  overrides: Partial<TrackType> = {},
): TrackType =>
  ({
    _id: 1,
    name: 'Test Track',
    author: 'Artist 1',
    genre: ['Rock'],
    release_date: '2024-01-01',
    ...overrides,
  }) as TrackType;

const createState = (
  tracks: TrackType[],
  filters: Partial<initialStateType['filters']> = {},
): initialStateType =>
  ({
    pagePlaylist: tracks,
    filters: {
      authors: [],
      genres: [],
      years: 'По умолчанию',
      search: '',
      ...filters,
    },
  }) as initialStateType;

describe('applyFilters', () => {
  const tracks = [
    createTrack({
      _id: 1,
      name: 'Believer',
      author: 'Imagine Dragons',
      genre: ['Rock', 'Pop'],
      release_date: '2017-02-01',
    }),
    createTrack({
      _id: 2,
      name: 'Bohemian Rhapsody',
      author: 'Queen',
      genre: ['Rock'],
      release_date: '1975-10-31',
    }),
    createTrack({
      _id: 3,
      name: 'Bad Guy',
      author: 'Billie Eilish',
      genre: ['Pop'],
      release_date: '2019-06-01',
    }),
  ];

  it('возвращает все треки без фильтров', () => {
    const state = createState(tracks);

    expect(applyFilters(state)).toEqual(tracks);
  });

  it('возвращает пустой массив для пустого плейлиста', () => {
    const state = createState([]);

    expect(applyFilters(state)).toEqual([]);
  });

  it('фильтрует треки по исполнителю', () => {
    const state = createState(tracks, {
      authors: ['Queen'],
    });

    expect(applyFilters(state)).toEqual([tracks[1]]);
  });

  it('фильтрует треки по нескольким исполнителям', () => {
    const state = createState(tracks, {
      authors: ['Queen', 'Billie Eilish'],
    });

    expect(applyFilters(state)).toEqual([tracks[1], tracks[2]]);
  });

  it('фильтрует треки по жанру', () => {
    const state = createState(tracks, {
      genres: ['Rock'],
    });

    expect(applyFilters(state)).toEqual([tracks[0], tracks[1]]);
  });

  it('фильтрует треки по нескольким жанрам', () => {
    const state = createState(tracks, {
      genres: ['Rock', 'Pop'],
    });

    expect(applyFilters(state)).toEqual(tracks);
  });

  it('ищет треки по началу названия', () => {
    const state = createState(tracks, {
      search: 'Bel',
    });

    expect(applyFilters(state)).toEqual([tracks[0]]);
  });

  it('не учитывает регистр при поиске', () => {
    const state = createState(tracks, {
      search: 'BELIEVER',
    });

    expect(applyFilters(state)).toEqual([tracks[0]]);
  });

  it('игнорирует пробелы в начале и конце поискового запроса', () => {
    const state = createState(tracks, {
      search: '  believer  ',
    });

    expect(applyFilters(state)).toEqual([tracks[0]]);
  });

  it('не ищет по совпадению внутри названия', () => {
    const state = createState(tracks, {
      search: 'liev',
    });

    expect(applyFilters(state)).toEqual([]);
  });

  it('игнорирует поиск, состоящий только из пробелов', () => {
    const state = createState(tracks, {
      search: '   ',
    });

    expect(applyFilters(state)).toEqual(tracks);
  });

  it('сортирует сначала новые', () => {
    const state = createState(tracks, {
      years: 'Сначала новые',
    });

    expect(applyFilters(state).map((track) => track._id)).toEqual([
      3,
      1,
      2,
    ]);
  });

  it('сортирует сначала старые', () => {
    const state = createState(tracks, {
      years: 'Сначала старые',
    });

    expect(applyFilters(state).map((track) => track._id)).toEqual([
      2,
      1,
      3,
    ]);
  });

  it('не сортирует треки при выборе "По умолчанию"', () => {
    const state = createState(tracks, {
      years: 'По умолчанию',
    });

    expect(applyFilters(state).map((track) => track._id)).toEqual([
      1,
      2,
      3,
    ]);
  });

  it('применяет несколько фильтров одновременно', () => {
    const state = createState(tracks, {
      authors: ['Imagine Dragons'],
      genres: ['Rock'],
      search: 'Bel',
    });

    expect(applyFilters(state)).toEqual([tracks[0]]);
  });

  it('возвращает пустой массив, если фильтры ничего не нашли', () => {
    const state = createState(tracks, {
      authors: ['Unknown Artist'],
    });

    expect(applyFilters(state)).toEqual([]);
  });
});