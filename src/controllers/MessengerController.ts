import { Dispatch } from 'core/Store';
import MessengerApi from 'api/MessengerApi';

import { initWss } from './initWss';

const MessengerController = {
  getChats: (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });
    MessengerApi.getChats()
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          dispatch({ chats: JSON.parse(res.response) });
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
  createChat: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    dispatch({ isLoading: true });
    MessengerApi.createChat(action)
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          MessengerController.getChats(dispatch);
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
  getChatUsers: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    dispatch({ isLoading: true });
    MessengerApi.getChatUsers(action)
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          dispatch({ usersInChat: JSON.parse(res.response) });
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
  deleteUserFromChat: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    dispatch({ isLoading: true });
    MessengerApi.deleteUserFromChat(action)
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          dispatch(MessengerController.getChatUsers, action.chatId);
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
  addUserToChat: (dispatch: Dispatch<AppState>, _state: AppState, action) => {
    dispatch({ isLoading: true });
    MessengerApi.addUserToChat(action)
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          dispatch(MessengerController.getChatUsers, action.chatId);
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
  initWss: (dispatch: Dispatch<AppState>, state: AppState, action) => {
    dispatch({ isLoading: true });
    MessengerApi.getWsToken(action)
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          const token = JSON.parse(res.response).token;
          initWss(dispatch, state.messages, state.user.id, action, token);
        }
      })
      .finally(() => {
        dispatch({ isLoading: false });
      });
  },
};

export default MessengerController;
