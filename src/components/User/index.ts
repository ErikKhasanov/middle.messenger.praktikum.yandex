import Block from 'core/Block';

import { withStore } from 'HOC/withStore';

import MessengerController from 'controllers/MessengerController';

import './user.css';

interface IUser {
  displayName: string;
  firstName: string;
  secondName: string;
  avatar: string;
  id: string;
  chatId: string;
}

const DEFAULT_AVATAR = 'https://via.placeholder.com/100';

class User extends Block {
  static componentName = 'User';

  constructor({ displayName, firstName, secondName, avatar, id, chatId }: IUser) {
    super({ displayName, firstName, secondName, avatar, id, chatId });
  }

  protected getStateFromProps(props: any): void {
    this.state = {
      onRemoveUser: () => {
        console.log(props);

        window.store.dispatch(MessengerController.deleteUserFromChat, { users: [this.props.id], chatId: this.props.chatId });
      },
    };
  }

  render(): string {
    const { avatar, displayName, firstName, secondName } = this.props;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2${avatar}` : DEFAULT_AVATAR;
    const name = displayName || `${firstName} ${secondName}`;
    return `
    <div class="user-card">
      <div class="user-card__avatar">
        <img src="${avatarUrl}" />
      </div>
      <div class="user-card_name">${name}</div>
      {{{Button label="X" classname="user-card_btn" onClick=onRemoveUser}}}
    </div>
    `;
  }
}

export default withStore(User);
