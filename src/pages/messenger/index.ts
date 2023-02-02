/* eslint-disable no-unused-vars */
import Block from 'core/Block';
import MessengerController from 'controllers/MessengerController';
import { withStore } from 'HOC/withStore';
import { PathRouter } from 'router/pathRouter';

const INIT_STATE = {
  values: {
    message: '',
  },
  errors: {
    message: '',
  },
};

class ChatsPage extends Block {
  componentDidMount(_props: any): void {
    this.props.store.dispatch(MessengerController.getChats);
  }

  protected router = PathRouter.getInstance();

  protected getStateFromProps(): void {
    this.state = {
      ...INIT_STATE,

      createChat: () => {
        const title = { title: prompt('Название чата', '') };
        this.props.store.dispatch(MessengerController.createChat, title);
      },

      onClickChat: id => {
        this.router.go(`/messenger/${id}`);
      },
    };
  }

  render() {
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
              {{#each store.state.chats}}
                {{#with this}}
                  {{{ChatComponent name=title lastMessage=lastMessage avatar=avatar id=id onClick=@root.onClickChat}}}
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

export default withStore(ChatsPage);
