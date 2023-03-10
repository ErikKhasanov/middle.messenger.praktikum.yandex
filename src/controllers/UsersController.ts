import UsersApi, { IChangeProfile, IChangePassword, IChangeAvatar } from 'api/UsersApi';

const changeProfileDispatch: DispatchStateHandler<IChangeProfile> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
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
      dispatch({ app: { ...state, isLoading: true } });
    });
};

const changeAvatarDispatch: DispatchStateHandler<IChangeAvatar> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
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
      dispatch({ app: { ...state, isLoading: true } });
    });
};

const changePasswordDispatch: DispatchStateHandler<IChangePassword> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  UsersApi.changePassword(action)
    .then(res => {
      if (res.status !== 200) {
        if (res.response) {
          alert(JSON.parse(res.response).reason);
          return;
        }
        alert('Произошла неизвестная ошибка');
        console.error(res);
        return;
      }
      alert('Пароль изменен');
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: true } });
    });
};

const UsersController = {
  changeProfile: changeProfileDispatch,
  changeAvatar: changeAvatarDispatch,
  changePassword: changePasswordDispatch,
};

export default UsersController;
