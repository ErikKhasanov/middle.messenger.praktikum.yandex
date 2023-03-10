import Block from 'core/Block';

import './button.css';

interface IButtonProps {
  classname: string;
  label: string;
  events: { [key: string]: () => void };
  onClick: () => void;
}

export class Button extends Block<Omit<IButtonProps, 'onClick'>> {
  static componentName = 'Button';

  constructor({ classname, label, onClick }: Omit<IButtonProps, 'events'>) {
    super({ classname, label, events: { click: onClick } });
  }

  render(): string {
    const { classname } = this.props;
    return `<button class="button ${classname || ''}">{{label}}</button>`;
  }
}
