import { Dispatch } from 'core/Store';
import UserApi from 'api/UserApi';

const InitApp = (dispatch: Dispatch<AppState>) => {
  UserApi.getUser()
    .then(res => {
      if (res.status === 200) {
        dispatch({ appIsInited: true, user: JSON.parse(res.response) });
      }
      if (res.status === 401) {
        dispatch({ appIsInited: true, user: null });
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export default InitApp;
