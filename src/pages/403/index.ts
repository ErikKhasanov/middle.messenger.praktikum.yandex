import { Block } from 'core';

class ForbiddenPage extends Block {
  render() {
    return `
    <main>
      <div class="error-wrapper">
        <div class="error-wrapper__content">
          <img src="assets/404.png" alt="403" />
          <h1>403</h1>
          <p>Страница недоступна неавторизованным пользователям</p>
          {{{Link label="Войти" route="/signin"}}}
        </div>
      </div>
    </main>
      `;
  }
}
export default ForbiddenPage;
