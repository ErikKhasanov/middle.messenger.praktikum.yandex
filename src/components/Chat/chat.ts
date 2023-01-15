import { Block } from 'core';

import './chat.css';

interface IChatComponent {
  avatar: string;
  name: string;
  message: string;
}

export class ChatComponent extends Block {
  static componentName = 'ChatComponent';

  constructor({ avatar, name, message }: IChatComponent) {
    super({ avatar, name, message });
  }

  render() {
    return `
    <div class="chat">
        <div class="avatar">
            <img src={{avatar}} alt="" />
        </div>
        <div class="description">
            <h4>{{name}}</h4>
            <p>
            {{message}}
            </p>
        </div>
    </div>
    `;
  }
}
