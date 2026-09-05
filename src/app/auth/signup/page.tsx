'use client';

import { registerUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password.trim() || !repeatPassword.trim()) {
      return setError('Заполните все поля');
    }

    if (password.length < 6) {
      return setError('Пароль должен содержать минимум 6 символов');
    }

    if (password !== repeatPassword) {
      return setError('Пароли не совпадают');
    }

    setIsLoading(true);

    registerUser({ username, email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 412) {
            console.log(err.response?.data.data.errors);
          } else if (err.response) {
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
        name="username"
        placeholder="Имя пользователя"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeRepeatPassword}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
