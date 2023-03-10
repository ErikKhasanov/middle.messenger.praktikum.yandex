export const DEFAULT_STATE: Partial<AppState> = {
  app: {
    appIsInited: false,
    screen: undefined,
    isLoading: true,
    params: undefined,
  },
  chats: undefined,
  currentChat: {
    usersInChat: undefined,
  },
  messages: undefined,
  user: undefined,
  socket: undefined,
};
