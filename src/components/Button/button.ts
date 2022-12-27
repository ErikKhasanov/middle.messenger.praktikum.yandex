import Block from "../../core/Block";

import "./button.scss";

interface IButton {
  label: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({ label, onClick }: IButton) {
    super({ label, events: { click: onClick } });
  }
  render(): string {
    return `<button class="button">{{label}}</button>`;
  }
}
