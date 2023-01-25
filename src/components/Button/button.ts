import Block from 'core/Block';

import './button.css';

interface IButton {
  classname: string;
  label: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ classname, label, onClick }: IButton) {
    super({ classname, label, events: { click: onClick } });
  }

  render(): string {
    const { classname } = this.props;
    return `<button class="button ${classname || ''}">{{label}}</button>`;
  }
}
