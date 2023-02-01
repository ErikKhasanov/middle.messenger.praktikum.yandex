import { Store, renderDOM } from 'core';
import { CoreRouter } from './Router.interface';

import ChatsPage from 'pages/chats';
import ChatPage from 'pages/chat';
import ProfilePage from 'pages/profile';
import SettingsPage from 'pages/settings';
import SignupPage from 'pages/signup';
import SigninPage from 'pages/signin';
import ForbiddenPage from 'pages/403';

const ROUTES = {
  '/signin': {
    block: SigninPage,
    shouldAuthorized: false,
    title: 'Войти в аккаунт',
  },
  '/signup': {
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
  '/chats': {
    block: ChatsPage,
    shouldAuthorized: true,
    title: 'Чат',
  },
  '/chat/:id': {
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
    router.use(path, params => {
      const isAuthorized = Boolean(store.getState().user);
      // if (path === '*') {
      //   if (isAuthorized) {
      //     router.go('/chats');
      //     store.dispatch({ screen: ROUTES['/chats'], params });
      //   } else {
      //     router.go('/signin');
      //     store.dispatch({ screen: ROUTES['/signin'], params });
      //   }
      //   return;
      // }

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
