/* eslint-disable no-unused-vars */
import { Block, AppStore, AppRouter } from 'core';

import MessengerController from 'controllers/MessengerController';
import connectStore from 'HOC/connectStore';

const INIT_STATE = {
  values: {
    message: '',
  },
  errors: {
    message: '',
  },
};

interface IChatsPageProps {
  chats: Chat[];
}

class ChatsPage extends Block<IChatsPageProps> {
  componentDidMount(_props: any): void {
    AppStore.dispatch(MessengerController.getChats);
  }

  protected getStateFromProps(): void {
    this.state = {
      ...INIT_STATE,

      createChat: () => {
        const title = { title: prompt('Название чата', '') };
        AppStore.dispatch(MessengerController.createChat, title);
      },

      onClickChat: (id: string) => {
        AppRouter.go(`/messenger/${id}`);
      },
    };
  }

  render() {
    const { chats } = this.props;
    return `
    {{#Layout isLoading=store.state.isLoading}}
      <main>
      <div class="layout">
      <div class="sidebar">
        <div class="profile-link">
          {{{Link label="Профиль" route="/profile"}}}
        </div>
        <div class="search">
            {{{InputControll placeHolder="Поиск" onInput=onInput onBlur=onBlur onFocus=onFocus id="search" ref="messageRef" label="Поиск" type="text"  inputValue="" errorText="" }}}
        </div>
        <div class="chats-wrapper">
            <div class="chats-wrapper_list">
              {{#each chats}}
                {{#with this}}
                  {{{ChatComponent name=title lastMessage=last_message avatar=avatar id=id onClick=@root.onClickChat}}}
                {{/with}}
              {{/each}}
            </div>
        </div>
        <div class="chats-add">{{{Button label="Создать чат" onClick=createChat}}}</div>
        </div>
      </div>
      </main>
    {{/Layout}}`;
  }
}

const mapStateToProps = (state: AppState) => ({
  chats: state.chats,
});
export default connectStore(mapStateToProps)(ChatsPage);
