import { registerComponent } from 'core';
import AppRouter from 'core/Router';
import AppStore from 'core/Store';
import InitApp from './controllers/InitApp';
import { initRouter } from 'router/initRouter';

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

document.addEventListener('DOMContentLoaded', () => {
  AppStore.dispatch(InitApp);
  initRouter(AppRouter, AppStore);
  AppStore.on('changed', (_prevState, nextState) => {
    console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
  });
});
