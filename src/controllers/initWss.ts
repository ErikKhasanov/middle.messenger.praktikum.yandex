export const initWss = (dispatch, messages = [], userId, chatId, token) => {
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
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
    if (data.type === 'message') {
      console.log(messages, data);

      const newMessages = messages;
      newMessages.push(data);
      dispatch({ messages: newMessages });
    }
  });

  socket.addEventListener('error', event => {
    console.log('Ошибка', event.message);
  });

  dispatch({ socket: socket });
};
