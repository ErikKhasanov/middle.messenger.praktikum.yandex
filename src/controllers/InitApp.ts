import { Dispatch } from 'core/Store';
import UserApi from 'api/UserApi';

const InitApp = (dispatch: Dispatch<AppState>) => {
  UserApi.getUser().then(res => {
    if (res.status === 200 && res.statusText === 'OK') {
      dispatch({ appIsInited: true, user: JSON.parse(res.response) });
    }
    if (res.status === 401) {
      dispatch({ appIsInited: true, user: null });
    }
  });
};

export default InitApp;
