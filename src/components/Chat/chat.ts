import { Block } from 'core';

import './chat.css';

interface IChatComponent {
  avatar: string;
  name: string;
  lastMessage: string;
  id: number;
  onClick: () => void;
}

const DEFAULT_AVATAR = 'https://via.placeholder.com/100';

export class ChatComponent extends Block {
  static componentName = 'ChatComponent';

  constructor({ avatar, name, lastMessage, id, onClick }: IChatComponent) {
    super({ avatar, name, lastMessage, id, events: { click: () => onClick(id) } });
  }

  render() {
    return `
    <div class="chat">
        <div class="avatar">
            {{#if avatar}}
              <img src={{avatar}} alt="" />
            {{/if}}
            {{#unless avatar}}
              <img src=${DEFAULT_AVATAR} alt="" />
            {{/unless}}
        </div>
        <div class="description">
            <h4>{{name}}</h4>
            <p>
              {{#if lastMessage}}
                {{lastMessage}}
              {{/if}}
              {{#unless lastMessage}}
                Здесь ещё пусто...
              {{/unless}}
            </p>
        </div>
    </div>
    `;
  }
}
