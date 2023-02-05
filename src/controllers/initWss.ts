import { Dispatch } from 'core/Store';

export const initWss = (dispatch: Dispatch<AppState>, userId, chatId, token) => {
  try {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    let prevMessages;

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
      console.log('Получены данные', event.data);
      const data = JSON.parse(event.data);
      let newMessages = [];

      if (Array.isArray(data)) {
        // Если история пустая
        if (data.length === 0) {
          dispatch({ messages: [] });
          return;
        }
        data.forEach(item => {
          newMessages.push(item);
        });
        newMessages = newMessages.sort((a, b) => {
          return new Date(a.time) - new Date(b.time);
        });
        dispatch({
          messages: newMessages,
        });
        prevMessages = newMessages;
        return;
      }
      if (data.type !== 'message') return;
      newMessages = [...prevMessages, data];
      dispatch({ messages: newMessages });
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
