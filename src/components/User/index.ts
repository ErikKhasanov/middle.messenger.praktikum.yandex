import Block from 'core/Block';

import './user.css';

interface IUser {
  displayName: string;
  firstName: string;
  secondName: string;
  avatar: string;
  id: string;
  chatId: string;
  onRemove: () => void;
}

const DEFAULT_AVATAR = 'https://via.placeholder.com/100';

class User extends Block {
  static componentName = 'User';

  constructor({ displayName, firstName, secondName, avatar, id, onRemove }: IUser) {
    super({ displayName, firstName, secondName, avatar, id, onRemove });
  }

  protected getStateFromProps(): void {
    this.state = {
      onRemoveWrapper: () => {
        this.props.onRemove(this.props.id);
      },
    };
  }

  render(): string {
    const { avatar, displayName, firstName, secondName } = this.props;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : DEFAULT_AVATAR;
    const name = displayName || `${firstName} ${secondName}`;
    return `
    <div class="user-card">
      <div class="user-card__avatar">
        <img src="${avatarUrl}" />
      </div>
      <div class="user-card_name">${name}</div>
      {{{Button label="X" classname="user-card_btn" onClick=onRemoveWrapper}}}
    </div>
    `;
  }
}

export default User;
