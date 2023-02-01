import UsersApi from 'api/UsersApi';
import { Dispatch } from 'core/Store';

const UsersController = {
  changeProfile: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    UsersApi.changeProfie(action).then(res => {
      const response = JSON.parse(res.response);
      if (res.status !== 200) {
        if (response.reason) {
          alert(response.reason);
          return;
        }
        alert('Произошла неизвестная ошибка');
        console.error(res);
      }
      dispatch({ user: response });
    });
  },

  changeAvatar: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    UsersApi.changeAvatar(action).then(res => {
      const response = JSON.parse(res.response);
      if (res.status !== 200) {
        if (response.reason) {
          alert(response.reason);
          return;
        }
        alert('Произошла неизвестная ошибка');
        console.error(res);
      }
      dispatch({ user: response });
    });
  },

  changePassword: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    UsersApi.changePassword(action).then(res => {
      const response = JSON.parse(res.response);
      if (res.status !== 200) {
        if (response.reason) {
          alert(response.reason);
          return;
        }
        alert('Произошла неизвестная ошибка');
        console.error(res);
      }
      alert('Пароль изменен');
    });
  },
};

export default UsersController;
