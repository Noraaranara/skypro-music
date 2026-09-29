import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';

export type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  dislikedTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  pagePlaylist: TrackType[];
  filterTracks: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: string;
    search: string;
  };
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  allTracks: [],
  favoriteTracks: [],
  dislikedTracks: [],
  fetchError: null,
  fetchIsLoading: false,
  pagePlaylist: [],
  filterTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
    search: '',
  },
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlay = true;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex === -1 || curIndex >= playlist.length - 1) {
        return;
      }
      state.currentTrack = playlist[curIndex + 1];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );

      if (curIndex <= 0) {
        return;
      }

      state.currentTrack = playlist[curIndex - 1];
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    setDislikedTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.dislikedTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks.push(action.payload);
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
      state.filterTracks = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;

      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (el) => el !== author,
        );
      } else {
        state.filters.authors.push(author);
      }

      state.filterTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;

      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (el) => el !== genre,
        );
      } else {
        state.filters.genres.push(genre);
      }

      state.filterTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;

      state.filterTracks = applyFilters(state);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;

      state.filterTracks = applyFilters(state);
    },
    setFilterTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.filterTracks = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        years: 'По умолчанию',
        search: '',
      };

      state.filterTracks = state.pagePlaylist;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
  toggleShuffle,
  setNextTrack,
  setPrevTrack,
  setAllTracks,
  setFavoriteTracks,
  setDislikedTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
  setPagePlaylist,
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
  setSearch,
  setFilterTracks,
  resetFilters,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
