import { Block } from "../../core";

import "./chat.scss";

export class Chat extends Block {
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
