'use client';

import { authUser, getToken } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { ROUTER } from '@/app/routes';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setAccessToken, setRefreshToken, setUsername } from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      return setError('Заполните все поля');
    }

    setIsLoading(true);

    authUser({ email, password })
      .then(() => {
        dispatch(setUsername(email))
        return getToken({ email, password });
      })
      .then((res) => {
        dispatch(setAccessToken(res.access))
        dispatch(setRefreshToken(res.refresh))
        router.push(ROUTER.main);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data.message);
          } else if (err.request) {
            setError('Что-то не так с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Неизвестная ошибка');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" width={140} height={20} alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
