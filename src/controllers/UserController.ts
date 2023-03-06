import UserApi, { ISigninData, ISignupData } from 'api/UserApi';
import AppRouter from 'core/Router';

const signInDispatch: DispatchStateHandler<ISigninData> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  UserApi.signin(action)
    .then(res => {
      if (res.status === 400) {
        UserApi.logout();
        return;
      }
      if (res.status === 200) {
        UserApi.getUser().then(res => {
          dispatch({ user: JSON.parse(res.response) });
          AppRouter.go('/messenger');
        });
        return;
      }
      if (res.status === 401) {
        alert('Аккаунт не найден');
        return;
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const signUpDispatch: DispatchStateHandler<ISignupData> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  UserApi.signup(action)
    .then(res => {
      if (res.status === 200) {
        dispatch({ user: JSON.parse(res.response) });
        AppRouter.go('/chats');
        return;
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
      if (res.status !== 200) {
        // TODO заменить alert toast
        alert(JSON.parse(res.response).reason);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const userLogoutDispatch = () => {
  UserApi.logout().then(() => window.location.reload());
};

export default {
  signin: signInDispatch,
  signup: signUpDispatch,
  logout: userLogoutDispatch,
};
