import { Block } from 'core';

import './chat.css';

import { DEFAULT_AVATAR } from 'configs/config';
interface IChatComponentProps {
  avatar: string;
  name: string;
  lastMessage: { content: string };
  id: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  events: { [key: string]: (id: string) => void };
}

export class ChatComponent extends Block<Omit<IChatComponentProps, 'onClick'>> {
  static componentName = 'ChatComponent';

  constructor({ avatar, name, lastMessage, id, onClick }: Omit<IChatComponentProps, 'events'>) {
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
