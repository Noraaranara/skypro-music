'use client';

import style from './Sidebar.module.css';
import { ROUTER } from '@/app/routes';
import SidebarItem from './SidebarItem/SidebarItem';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { clearUser } from '@/store/features/authSlice';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const username = useAppSelector((state) => state.auth.username);

  const authButton = () => {
    if (username) {
      dispatch(clearUser());

      if (pathname === ROUTER.favorites) {
        router.push(ROUTER.main);
      }
    } else {
      router.push(ROUTER.signin);
    }
  };
  return (
    <div className={style.main__sidebar}>
      <div className={style.sidebar__personal}>
        <p className={style.sidebar__personalName}>{username || 'Инкогнито'}</p>
        <div className={style.sidebar__icon} onClick={authButton}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={style.sidebar__block}>
        <div className={style.sidebar__list}>
          <SidebarItem
            route={ROUTER.category}
            id={2}
            src={'/img/playlist01.png'}
            alt={'Плейлист дня'}
          />
          <SidebarItem
            route={ROUTER.category}
            id={3}
            src={'/img/playlist02.png'}
            alt={'100 хитов'}
          />
          <SidebarItem
            route={ROUTER.category}
            id={4}
            src={'/img/playlist03.png'}
            alt={'Инди-заряд'}
          />
        </div>
      </div>
    </div>
  );
}
