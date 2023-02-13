declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
  };

  // eslint-disable-next-line no-unused-vars
  export type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state?: AppState, action?: TAction) => Promise<void>;
}

export {};
