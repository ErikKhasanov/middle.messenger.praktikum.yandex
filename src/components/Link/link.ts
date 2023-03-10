import Block from 'core/Block';
import AppRouter from 'core/Router';

import './link.css';

interface IButtonProps {
  label: string;
  route: string;
}

class Link extends Block {
  static componentName = 'Link';

  constructor({ label, route }: IButtonProps) {
    super({
      label,
      events: {
        click: (e: { preventDefault: () => void }) => {
          e.preventDefault();
          AppRouter.go(route);
        },
      },
    });
  }

  render(): string {
    return `<a class="link">{{label}}</a>`;
  }
}

export default Link;
