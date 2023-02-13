import HTTPTransport from 'helpers/HTTPTransport';

const http = new HTTPTransport();

export interface ICreateChat {
  title: string;
}

export interface IAddUserChat {
  users: number[];
  chatId: number;
}

export interface IDeleteUserFromChat {
  users: number[];
  chatId: number;
}

const MessengerApi = {
  getChats: () => {
    return http.get('/chats');
  },
  createChat: (data: ICreateChat) => {
    return http.post('/chats', data);
  },
  addUserToChat: (data: IAddUserChat) => {
    return http.put('/chats/users', data);
  },
  deleteUserFromChat: (data: IDeleteUserFromChat) => {
    return http.delete('/chats/users', data);
  },
  getChatUsers: (id: string) => {
    return http.get(`/chats/${id}/users`);
  },
  getWsToken: (id: string) => {
    return http.post(`/chats/token/${id}`);
  },
  deleteChatByID: (id: string) => {
    return http.delete('/chats', { chatId: id });
  },
};

export default MessengerApi;
