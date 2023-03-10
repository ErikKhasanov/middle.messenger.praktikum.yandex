/* eslint-disable no-unused-vars */
declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type User = {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
  };

  export type Chat = {
    avatar: string | null;
    created_by: number;
    id: number;
    last_message: string | null;
    title: string;
    unread_count: number;
  };
  interface IMessage {
    id: number;
    title: string;
    avatar: string;
    unread_count: string;
    time: string;
    last_message: {
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
    };
  }

  type socket = () => void;

  type userInChat = User & { role: 'string' };

  export type AppState = {
    app: {
      appIsInited: boolean;
      screen: Screens;
      isLoading: boolean;
      params: { [key: string]: string } | undefined;
      isLoading: false;
    };
    chats: Chat[];
    currentChat: {
      usersInChat: userInChat[] | undefined;
    };
    messages: IMessage[] | undefined;
    user: User;
    socket: WebSocket;
  };

  export type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>, payload?: any) => void;

  export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any) => void;

  // eslint-disable-next-line no-unused-vars
  export type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state?: any, action?: any) => Promise<void>;

  export interface InputTarget extends HTMLInputElement {
    target: HTMLInputElement;
    preventDefault: () => void;
  }
  export interface FormElements extends HTMLCollection {
    [key: string]: any;
  }
}

export {};
