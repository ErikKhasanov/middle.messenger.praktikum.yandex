import Block from 'core/Block';

import './button.css';

interface IButton {
  label: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ label, onClick }: IButton) {
    super({ label, events: { click: onClick } });
  }

  render(): string {
    return `<button class="button">{{label}}</button>`;
  }
}
