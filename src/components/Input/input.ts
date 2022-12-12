import Block from "../../core/Block";

import "./input.scss";

interface IInput {
  id: string;
  type: string;
  label: string;
}

export class Input extends Block {
  constructor({ id, type, label }: IInput) {
    super({ id: id, type: type, label: label });
  }
  render(): string {
    // language=hbs
    return `
      <div class="input">
        <label class="placeholder-text" for={{id}}>{{label}}</label>
        <input value="" id={{id}} type={{type}} />
      </div>
    `;
  }
}
