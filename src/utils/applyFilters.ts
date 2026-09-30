import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (
  state: initialStateType,
): TrackType[] => {
  let result = [...state.pagePlaylist];

  const { authors, genres, years, search } = state.filters;

  if (authors.length > 0) {
    result = result.filter((track) =>
      authors.includes(track.author),
    );
  }

  if (genres.length > 0) {
    result = result.filter((track) =>
      genres.some((genre) => track.genre.includes(genre)),
    );
  }

  if (search.trim()) {
    const searchValue = search.trim().toLowerCase();

    result = result.filter((track) =>
      track.name.toLowerCase().startsWith(searchValue),
    );
  }

  if (years === 'Сначала новые') {
    result.sort(
      (a, b) =>
        new Date(b.release_date).getTime() -
        new Date(a.release_date).getTime(),
    );
  }

  if (years === 'Сначала старые') {
    result.sort(
      (a, b) =>
        new Date(a.release_date).getTime() -
        new Date(b.release_date).getTime(),
    );
  }

  return result;
};