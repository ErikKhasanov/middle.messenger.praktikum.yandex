import Block from 'core/Block';
import './layout.css';

interface ILayoutProps {
  isLoading: boolean;
}

class Layout extends Block<ILayoutProps> {
  static componentName = 'Layout';

  constructor(props: ILayoutProps) {
    super(props);
  }

  protected render() {
    // eslint-disable-next-line no-unused-vars
    const { isLoading } = this.props;

    return `
      <div class="app-layout">
        {{#if isLoading}}<div class="loader-wrapper"><span class="loader"></span></div>{{/if}}
        <div class="app_content" data-layout=1></div>
      </div>
      `;
  }
}

export default Layout;
