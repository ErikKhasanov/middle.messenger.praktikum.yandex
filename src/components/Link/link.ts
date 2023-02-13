import Block from 'core/Block';
import withRouter from 'HOC/withRouter';

import './link.css';

interface IButton {
  label: string;
  route: string;
}

class Link extends Block {
  static componentName = 'Link';

  constructor({ label, route, router }: IButton) {
    super({
      label,
      events: {
        click: e => {
          e.preventDefault();
          router.go(route);
        },
      },
    });
  }

  render(): string {
    return `<a class="link">{{label}}</a>`;
  }
}

export default withRouter(Link);
