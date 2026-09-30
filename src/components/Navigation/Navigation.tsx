'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { navigationApp, ROUTER } from '@/app/routes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  clearUser,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const access = useAppSelector((state) => state.auth.access);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (username) {
      dispatch(setUsername(username));
    }

    if (access) {
      dispatch(setAccessToken(access));
    }

    if (refresh) {
      dispatch(setRefreshToken(refresh));
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearUser());

    localStorage.removeItem('username');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    if (pathname === ROUTER.favorites) {
      router.push(ROUTER.main);
    }
  }, [dispatch, pathname, router]);

  const navigationItems = useMemo(() => {
    return navigationApp.filter((el) => {
      if (el.url === ROUTER.favorites && !access) {
        return false;
      }

      return true;
    });
  }, [access]);
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={113.33}
          height={43}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={() => setOpen(!open)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {open && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            {navigationItems.map((el) => (
              <li className={styles.menu__item} key={el.url}>
                {el.action === 'auth' && access ? (
                  <button className={styles.menu__link} onClick={logout}>
                    Выйти
                  </button>
                ) : (
                  <Link href={el.url} className={styles.menu__link}>
                    {el.action === 'auth' ? 'Войти' : el.namePage}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
