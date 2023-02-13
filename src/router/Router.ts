import { Store, renderDOM } from 'core';

import ChatsPage from 'pages/messenger';
import ChatPage from 'pages/messenger[id]';
import ProfilePage from 'pages/profile';
import SettingsPage from 'pages/settings';
import SignupPage from 'pages/signup';
import SigninPage from 'pages/signin';
import ForbiddenPage from 'pages/403';

const ROUTES = {
  '/': {
    block: SigninPage,
    shouldAuthorized: false,
    title: 'Войти в аккаунт',
  },
  '/sign-up': {
    block: SignupPage,
    shouldAuthorized: false,
    title: 'Зарегистрироваться',
  },
  '/profile': {
    block: ProfilePage,
    shouldAuthorized: true,
    title: 'Мой профиль',
  },
  '/settings': {
    block: SettingsPage,
    shouldAuthorized: true,
    title: 'Мои настройки',
  },
  '/messenger': {
    block: ChatsPage,
    shouldAuthorized: true,
    title: 'Чат',
  },
  '/messenger/:id': {
    block: ChatPage,
    shouldAuthorized: true,
    title: 'Чат',
  },
  '*': {
    block: ChatsPage,
    shouldAuthorized: true,
    title: '',
  },
};

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  const routes = Object.keys(ROUTES);
  routes.forEach(path => {
    router.use(path, (params: { [key: string]: string }) => {
      const isAuthorized = Boolean(store.getState().user);
      if (path === '/' && isAuthorized) {
        router.go('/messenger');
        store.dispatch({ screen: ROUTES['/messenger'], params });
        return;
      }
      if (path === '*') {
        if (isAuthorized) {
          router.go('/messenger');
          store.dispatch({ screen: ROUTES['/messenger'], params });
        } else {
          router.go('/');
          store.dispatch({ screen: ROUTES['/'], params });
        }
        return;
      }

      if (isAuthorized || !ROUTES[path].shouldAuthorized) {
        store.dispatch({ screen: ROUTES[path], params });
        return;
      }

      if (!isAuthorized && ROUTES[path].shouldAuthorized) {
        store.dispatch({ screen: { block: ForbiddenPage }, params });
        return;
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = nextState.screen;
      if (!Page) return;
      renderDOM(new Page.block({ params: nextState.params }));
      document.title = Page.title || Page.componentName;
    }
  });
}
