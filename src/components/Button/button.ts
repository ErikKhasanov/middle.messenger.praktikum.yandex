import Block from "../../core/Block";

interface IButton {
  label: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({ label, onClick }: IButton) {
    super({ label: label, events: { click: onClick } }, "button");
  }
  render(): string {
    return `{{label}}`;
  }
}
