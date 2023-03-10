import { APP_ROUTES } from './config';
import renderDOM from 'core/renderDOM';
import Router from 'core/Router';
import Store from 'core/Store';

export function initRouter(router: typeof Router, store: typeof Store) {
  APP_ROUTES.forEach(route => {
    router.use(route.path, (params: { [key: string]: string }) => {
      const isAuthorized = Boolean(store.getState().user?.login);
      const currentScreen = Boolean(store.getState().app.screen);
      if (isAuthorized || !route.shouldAuthorized) {
        if (route.path === '/') {
          router.go('/messenger');
          return;
        }
        store.dispatch({
          app: {
            ...store.getState().app,
            screen: route.block,
            params: params,
          },
        });
        return;
      }
      if (!currentScreen) {
        store.dispatch({
          app: {
            ...store.getState().app,
            screen: APP_ROUTES[0].block,
            params: params,
          },
        });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.app.appIsInited && nextState.app.appIsInited) {
      router.start();
    }

    if (prevState.app.screen !== nextState.app.screen) {
      const Page = nextState.app.screen;
      renderDOM(new Page({ params: nextState.app.params }));
      document.title = 'Chat app';
    }
  });
}
