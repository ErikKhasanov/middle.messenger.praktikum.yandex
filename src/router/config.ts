/* eslint-disable @typescript-eslint/no-explicit-any */
import SigninPage from 'pages/signin';
import SignupPage from 'pages/signup';
import ProfilePage from 'pages/profile';
import ChatsPage from 'pages/messenger';
import ChatsPageById from 'pages/messenger[id]';
import SettingsPage from 'pages/settings';
// import NotFoundPage from 'pages/404';
// import ForbiddenPage from 'pages/403';
// import ErrorPage from 'pages/500';

export const APP_ROUTES = [
  {
    path: '/signin',
    block: SigninPage,
    shouldAuthorized: false,
  },
  {
    path: '/signup',
    block: SignupPage,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: ProfilePage,
    shouldAuthorized: true,
  },
  {
    path: '/settings',
    block: SettingsPage,
    shouldAuthorized: true,
  },
  {
    path: '/messenger',
    block: ChatsPage,
    shouldAuthorized: true,
  },
  {
    path: '/messenger/:id',
    block: ChatsPageById,
    shouldAuthorized: true,
  },
];
