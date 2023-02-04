import { Dispatch } from 'core/Store';
import { PathRouter } from 'router/pathRouter';
import MessengerApi, { ICreateChat, IDeleteUserFromChat, IAddUserChat } from 'api/MessengerApi';

import { initWss } from './initWss';

const getChatsDispath = (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });
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
      dispatch({ isLoading: false });
    });
};

const createChatDispatch: DispatchStateHandler<ICreateChat> = async (dispatch, _state, action) => {
  dispatch({ isLoading: true });
  MessengerApi.createChat(action)
    .then(res => {
      if (res.status === 200) {
        getChatsDispath(dispatch);
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
      dispatch({ isLoading: false });
    });
};

const getChatsUsersDispatch: DispatchStateHandler<string> = async (dispatch, _state, action) => {
  dispatch({ isLoading: true });
  MessengerApi.getChatUsers(action)
    .then(res => {
      if (res.status === 200) {
        dispatch({ usersInChat: JSON.parse(res.response) });
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
      dispatch({ isLoading: false });
    });
};

const deleteUserFromChat: DispatchStateHandler<IDeleteUserFromChat> = async (dispatch, _state, action) => {
  dispatch({ isLoading: true });
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
      dispatch({ isLoading: false });
    });
};

const addUserToChatDispatch: DispatchStateHandler<IAddUserChat> = async (dispatch, _state, action) => {
  dispatch({ isLoading: true });
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
      dispatch({ isLoading: false });
    });
};

const initWssDispatch: DispatchStateHandler<string> = async (dispatch, state, action) => {
  dispatch({ isLoading: true });
  MessengerApi.getWsToken(action)
    .then(res => {
      if (res.status === 200) {
        const token = JSON.parse(res.response).token;
        initWss(dispatch, state.messages, state.user.id, action, token);
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
      dispatch({ isLoading: false });
    });
};

const deleteChatByIdDispatch: DispatchStateHandler<string> = async (dispatch, state, action) => {
  dispatch({ isLoading: true });
  MessengerApi.deleteChatByID(action)
    .then(res => {
      if (res.status === 200) {
        PathRouter.go('/messenger');
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
      dispatch({ isLoading: true });
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
