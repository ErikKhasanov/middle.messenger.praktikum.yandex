import { Dispatch } from 'core/Store';
import MessengerApi from 'api/MessengerApi';

import { initWss } from './initWss';

const MessengerController = {
  getChats: (dispatch: Dispatch<AppState>) => {
    MessengerApi.getChats().then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        dispatch({ chats: JSON.parse(res.response) });
      }
    });
  },
  createChat: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    MessengerApi.createChat(action).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        MessengerController.getChats(dispatch);
      }
    });
  },
  getChatUsers: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    MessengerApi.getChatUsers(action).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        dispatch({ usersInChat: JSON.parse(res.response) });
      }
    });
  },
  deleteUserFromChat: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    MessengerApi.deleteUserFromChat(action).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        dispatch(MessengerController.getChatUsers);
      }
    });
  },
  addUserToChat: (dispatch: Dispatch<AppState>) => {
    dispatch(MessengerController.getChatUsers);
  },
  initWss: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    MessengerApi.getWsToken(action).then(res => {
      if (res.status === 200 && res.statusText === 'OK') {
        const token = JSON.parse(res.response).token;
        initWss(dispatch, state.messages, state.user.id, action, token);
      }
    });
  },
};

export default MessengerController;
