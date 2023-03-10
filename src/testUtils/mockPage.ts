import { Block } from 'core';

class MockPage extends Block<Record<string, unknown>> {
  static componentName = 'MockPage';

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>Chat</h1>
          <h2>Page</h2>
        </main>
        `;
  }
}

export default MockPage;
