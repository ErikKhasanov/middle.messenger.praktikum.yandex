/* eslint-disable no-unused-vars */
import { Block, AppStore } from 'core';
import connectStore from 'HOC/connectStore';
import MessengerController from 'controllers/MessengerController';

interface IChatsPageByIdProps {
  currentChat: AppState['currentChat'];
  socket: AppState['socket'];
  params: { id: string };
}

class ChatPageById extends Block<IChatsPageByIdProps> {
  componentDidMount(_props: any): void {
    AppStore.dispatch(MessengerController.getChatUsers, this.props.params.id);
    AppStore.dispatch(MessengerController.initWss, this.props.params.id);
  }

  protected getStateFromProps(_props: any): void {
    this.state = {
      addUser: () => {
        const userId = prompt('Введите айди пользователя');
        AppStore.dispatch(MessengerController.addUserToChat, { users: [userId], chatId: this.props.params.id });
      },
      onInput: (e: InputTarget) => {
        const { value } = e.target;
        this.refs.messageRef.node.setAttribute('value', value);
      },
      sendMessage: () => {
        const message = this.refs.messageRef.node.value;
        this.refs.messageRef.value = '';
        this.props.socket.send(
          JSON.stringify({
            content: message,
            type: 'message',
          }),
        );
      },
      onRemoveUser: (id: string) => {
        AppStore.dispatch(MessengerController.deleteUserFromChat, { users: [id], chatId: this.props.params.id });
      },
      removeChat: () => {
        AppStore.dispatch(MessengerController.deleteChatById, this.props.params.id);
      },
    };
  }
  render() {
    const { usersInChat } = this.props.currentChat;
    const { messsages } = this.props;
    return `
    {{#Layout isLoading=store.state.isLoading}}
      <main>
      <div class="layout">
      <div class="sidebar">
          <div class="profile-link">
            {{{Link label="Назад к списку чатов" route="/messenger"}}}
            {{{Link label="Профиль" route="/profile"}}}
          </div>
          <div class="chats-wrapper">
          ${usersInChat?.map(
            item =>
              `{{{User displayName="${item.display_name}" firstName="${item.first_name}" secondName="${item.second_name}" avatar="${item.avatar}" id="${item.id}" onRemove=onRemoveUser }}}`,
          )}
          {{#each usersInChat}}
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
          <div class="messages_list">
          {{#each messages}}
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
          </div>
          <div class="layout_chat_controls">
            {{{InputComponent id="message" ref="messageRef" name="message" label="Введите сообщение" placeHolder="Введите сообщение" onInput=onInput}}}
            {{{Button classname="send" label="Отправить" onClick=sendMessage}}}
          </div>
        </div>
        </div>
      </main>
    {{/Layout}}
      `;
  }
}
const mapStateToProps = (state: AppState) => ({
  currentChat: state.currentChat || {},
  socket: state.socket,
  messages: state.messages,
});
export default connectStore(mapStateToProps)<IChatsPageByIdProps>(ChatPageById);
