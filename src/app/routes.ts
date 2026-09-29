type navType = {
  url: string;
  namePage: string;
  id?: number;
  action?: string
}

export const ROUTER = {
  main: '/music/main',
  category: '/music/category',
  favorites: '/music/favorites',
  signup: '/auth/signup',
  signin: '/auth/signin',
}

export const navigationApp: navType[] = [
  {
    url: ROUTER.main,
    namePage: 'Главная',
  },
  {
    url: ROUTER.favorites,
    namePage: 'Мой плейлист',
  },
  {
    url: ROUTER.signin,
    namePage: 'Войти',
    action: 'auth'
  }
]