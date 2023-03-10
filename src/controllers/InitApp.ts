import UserApi from 'api/UserApi';

const InitApp = (dispatch: Dispatch<AppState>, state: AppState) => {
  UserApi.getUser()
    .then(res => {
      if (res.status === 200) {
        dispatch({
          ...state,
          app: {
            ...state.app,
            appIsInited: true,
          },
          user: JSON.parse(res.response),
        });
      }
      if (res.status === 401) {
        dispatch({
          ...state,
          app: {
            ...state.app,
            appIsInited: true,
          },
          user: undefined,
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export default InitApp;
