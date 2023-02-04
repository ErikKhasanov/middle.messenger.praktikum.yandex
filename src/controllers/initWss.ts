import { Dispatch } from 'core/Store';

export const initWss = (dispatch: Dispatch<AppState>, messages = [], userId, chatId, token) => {
  try {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    });

    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
      console.log('Получены данные', JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data) {
        const newMessages = messages;
        if (Array.isArray(data)) {
          data.forEach(item => {
            newMessages.push(item);
          });
          dispatch({
            messages: newMessages.sort((a, b) => {
              return new Date(a.time) - new Date(b.time);
            }),
          });
          return;
        }
        if (data.type !== 'message') return;
        newMessages.push(data);
        dispatch({ messages: newMessages });
      }
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event.message);
    });

    dispatch({ socket: socket });
  } catch (error) {
    alert('Произошла ошибка попробуйте позднее');
    console.error(error);
  }
};
