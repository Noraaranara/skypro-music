'use client';

import Image from "next/image";
import Link from "next/link";
import styles from './Navigation.module.css';
import { useState } from "react";

export default function Navigation() {
    const [open, setOpen] = useState(false);
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
                        <li className={styles.menu__item}>
                            <Link href="/" className={styles.menu__link}>
                                Главное
                        </Link>
                    </li>
                    <li className={styles.menu__item}>
                        <Link href="#" className={styles.menu__link}>
                            Мой плейлист
                        </Link>
                    </li>
                    <li className={styles.menu__item}>
                        <Link href={'/auth/signin'} className={styles.menu__link}>
                            Войти
                        </Link>
                    </li>
                </ul>
            </div>
            )}
        </nav>
    )
}