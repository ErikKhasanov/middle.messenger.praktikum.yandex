/* eslint-disable no-unused-vars */
import { Block } from 'core';

import { withStore } from 'HOC/withStore';

import MessengerController from 'controllers/MessengerController';

class ChatPage extends Block {
  componentDidMount(_props: any): void {
    this.props.store.dispatch(MessengerController.getChatUsers, this.props.params.id);
    this.props.store.dispatch(MessengerController.initWss, this.props.params.id);
  }

  protected getStateFromProps(_props: any): void {
    this.state = {
      addUser: () => {
        const userId = prompt('Введите айди пользователя');
        this.props.store.dispatch(MessengerController.addUserToChat, { users: [userId], chatId: this.props.params.id });
      },
      onInput: e => {
        const { value } = e.target;
        this.refs.messageRef.setAttribute('value', value);
      },
      sendMessage: () => {
        const message = (this.refs.messageRef as HTMLInputElement).value;
        (this.refs.messageRef as HTMLInputElement).value = '';
        this.props.store.state.socket.send(
          JSON.stringify({
            content: message,
            type: 'message',
          }),
        );
      },
      onRemoveUser: (id: string) => {
        this.props.store.dispatch(MessengerController.deleteUserFromChat, { users: [id], chatId: this.props.params.id });
      },
      removeChat: () => {
        this.props.store.dispatch(MessengerController.deleteChatById, this.props.params.id);
      },
    };
  }
  render() {
    return `
      <main>
      <div class="layout">
      <div class="sidebar">
          <div class="profile-link">
            {{{Link label="Назад к списку чатов" route="/messenger"}}}
            {{{Link label="Профиль" route="/profile"}}}
          </div>
          <div class="chats-wrapper">
          {{#each store.state.usersInChat}}
          {{#with this}}
              {{{User displayName=display_name firstName=first_name secondName=second_name avatar=avatar id=id onRemove=@root.onRemoveUser }}}
            {{/with}}
          {{/each}}
          </div>
          <div class="chats-controls">
            <div>{{{Button label="Добавить пользователя" onClick=addUser}}}</div>
            <div>{{{Button label="Удалить чат" onClick=removeChat}}}</div>
          </div>
        </div>
        <div class="layout_chat">
          {{#each store.state.messages}}
            {{#with this}}
              <div class="message">
                <div class="message_user">
                  {{this.user_id}}
                  {{this.time}}
                </div>
                <div class="message_content">
                  {{this.content}}
                </div>
              </div>
            {{/with}}
          {{/each}}
          <div class="layout_chat_controls">
            {{{InputComponent id="message" ref="messageRef" name="message" label="Введите сообщение" placeHolder="Введите сообщение" onInput=onInput}}}
            {{{Button classname="send" label="Отправить" onClick=sendMessage}}}
          </div>
        </div>
        </div>
      </main>
      `;
  }
}
export default withStore(ChatPage);
