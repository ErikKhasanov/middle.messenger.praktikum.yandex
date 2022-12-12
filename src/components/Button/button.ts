import Block from "../../core/Block";

import "./button.scss";

interface IButton {
  label: string;
}

export class Button extends Block {
  constructor({ label }: IButton) {
    super({ label: label });
  }
  render(): string {
    // language=hbs
    return `<button class="button">{{label}}</button>`;
  }
}
