'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import {
  setUsername,
  setAccessToken,
  setRefreshToken,
} from './features/authSlice';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const username = localStorage.getItem('username');
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (username) {
      storeRef.current?.dispatch(setUsername(username));
    }

    if (access) {
      storeRef.current?.dispatch(setAccessToken(access));
    }

    if (refresh) {
      storeRef.current?.dispatch(setRefreshToken(refresh));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}