import UserApi from 'api/UserApi';
import { Dispatch } from 'core/Store';
import { PathRouter } from 'router/pathRouter';

const UserController = {
  signin: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    UserApi.signin(action).then(res => {
      if (res.status === 400) {
        UserApi.logout(dispatch);
        return;
      }
      if (res.status === 200 && res.statusText === 'OK') {
        UserApi.getUser().then(res => {
          dispatch({ user: JSON.parse(res.response) });
          PathRouter.go('/chats');
        });
        return;
      }
      if (res.status === 401) {
        // TODO заменить alert toast
        alert(JSON.parse(res.response).reason);
      }
    });
  },
  signup: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    UserApi.signup(action).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        dispatch({ user: JSON.parse(res.response) });
        PathRouter.go('/chats');
        return;
      }
      if (res.status !== 200) {
        // TODO заменить alert toast
        alert(JSON.parse(res.response).reason);
      }
    });
  },
  getUser: () => {
    UserApi.getUser().then(() => store.set('user', data));
  },
  logout: (dispatch: Dispatch) => {
    UserApi.logout().then(() => dispatch({ user: null }));
    PathRouter.go('/signin');
  },
};

export default UserController;