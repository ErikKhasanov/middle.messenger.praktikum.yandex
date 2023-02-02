import UsersApi from 'api/UsersApi';
import { Dispatch } from 'core/Store';

const UsersController = {
  changeProfile: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    dispatch({ isLoading: true });
    UsersApi.changeProfie(action)
      .then(res => {
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
      })
      .catch(error => {
        alert('Произошла ошибка, попопробуйте позднее');
        console.error(error);
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },

  changeAvatar: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    dispatch({ isLoading: true });
    UsersApi.changeAvatar(action)
      .then(res => {
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
      })
      .catch(error => {
        alert('Произошла ошибка, попопробуйте позднее');
        console.error(error);
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },

  changePassword: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    dispatch({ isLoading: true });
    UsersApi.changePassword(action)
      .then(res => {
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
      })
      .catch(error => {
        alert('Произошла ошибка, попопробуйте позднее');
        console.error(error);
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
};

export default UsersController;
