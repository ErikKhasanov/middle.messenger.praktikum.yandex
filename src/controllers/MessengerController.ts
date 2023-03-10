import { AppRouter } from 'core';
import MessengerApi, { ICreateChat, IDeleteUserFromChat, IAddUserChat } from 'api/MessengerApi';

import { initWss } from './initWss';

const getChatsDispath = (dispatch: Dispatch<AppState>, state: AppState) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.getChats()
    .then(res => {
      if (res.status === 200) {
        dispatch({ chats: JSON.parse(res.response) });
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const createChatDispatch: DispatchStateHandler<ICreateChat> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.createChat(action)
    .then(res => {
      if (res.status === 200) {
        getChatsDispath(dispatch, state);
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const getChatsUsersDispatch: DispatchStateHandler<string> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.getChatUsers(action)
    .then(res => {
      if (res.status === 200) {
        const newCurrentChat = { ...state.currentChat, usersInChat: JSON.parse(res.response) };
        dispatch({ currentChat: newCurrentChat });
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const deleteUserFromChat: DispatchStateHandler<IDeleteUserFromChat> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.deleteUserFromChat(action)
    .then(res => {
      if (res.status === 200) {
        dispatch(getChatsUsersDispatch, action.chatId);
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const addUserToChatDispatch: DispatchStateHandler<IAddUserChat> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.addUserToChat(action)
    .then(res => {
      if (res.status === 200) {
        dispatch(getChatsUsersDispatch, action.chatId);
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const initWssDispatch: DispatchStateHandler<string> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.getWsToken(action)
    .then(res => {
      if (res.status === 200) {
        const token = JSON.parse(res.response).token;
        initWss(dispatch, state.user.id, action, token, state);
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

const deleteChatByIdDispatch: DispatchStateHandler<string> = async (dispatch, state, action) => {
  dispatch({ app: { ...state.app, isLoading: true } });
  MessengerApi.deleteChatByID(action)
    .then(res => {
      if (res.status === 200) {
        AppRouter.go('/messenger');
        return;
      }
      if (res.status >= 400) {
        throw new Error(res.response);
      }
    })
    .catch(error => {
      alert('Произошла ошибка, попопробуйте позднее');
      console.error(error);
    })
    .finally(() => {
      dispatch({ app: { ...state.app, isLoading: false } });
    });
};

export default {
  getChats: getChatsDispath,
  createChat: createChatDispatch,
  getChatUsers: getChatsUsersDispatch,
  deleteUserFromChat: deleteUserFromChat,
  addUserToChat: addUserToChatDispatch,
  initWss: initWssDispatch,
  deleteChatById: deleteChatByIdDispatch,
};
