import { Block } from 'core';

import './chat.css';

import { DEFAULT_AVATAR } from 'configs/config';
interface IChatComponent {
  avatar: string;
  name: string;
  lastMessage: string;
  id: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
}

export class ChatComponent extends Block {
  static componentName = 'ChatComponent';

  constructor({ avatar, name, lastMessage, id, onClick }: IChatComponent) {
    super({ avatar, name, lastMessage, id, events: { click: () => onClick(id) } });
  }

  render() {
    const { avatar, lastMessage } = this.props;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2/resources/${avatar}` : DEFAULT_AVATAR;
    const lastMessageText = lastMessage ? lastMessage.content : 'Здесь ещё пусто';

    return `
    <div class="chat">
        <div class="avatar">
          <img src="${avatarUrl}" alt="" />
        </div>
        <div class="description">
            <h4>{{name}}</h4>
            <p>
              ${lastMessageText}
            </p>
        </div>
    </div>
    `;
  }
}
