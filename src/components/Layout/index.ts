import Block from 'core/Block';
import './layout.css';

class Layout extends Block {
  static componentName = 'Layout';

  constructor(props) {
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
