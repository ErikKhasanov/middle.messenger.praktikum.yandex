import { registerComponent, Store } from 'core';
import { initRouter } from 'router/Router';
import { PathRouter } from 'router/pathRouter';

import InitApp from 'controllers/InitApp';

// Styles
import 'styles/main.css';

// Components
import Button from 'components/Button';
import { InputControll, LabelComponent, InputComponent } from 'components/InputControll';
import ChatComponent from 'components/Chat';
import ProfileSetting from 'components/ProfileSetting';
import Link from 'components/Link/link';
import FileForm from 'components/FileForm';
import User from 'components/User';
import Layout from 'components/Layout';

registerComponent(Button);
registerComponent(InputComponent);
registerComponent(LabelComponent);
registerComponent(InputControll);
registerComponent(ChatComponent);
registerComponent(ProfileSetting);
registerComponent(Link);
registerComponent(FileForm);
registerComponent(User);
registerComponent(Layout);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

const DEFAULT_STATE = {
  appIsInited: false,
  screen: null,
  isLoading: false,
  user: null,
};

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(DEFAULT_STATE);
  const router = PathRouter.getInstance();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(InitApp);
});
