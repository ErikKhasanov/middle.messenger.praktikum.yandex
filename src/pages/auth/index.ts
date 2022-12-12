import { Block } from "../../core";

import "./auth.scss";

class LoginPage extends Block {
  render() {
    // language=hbs
    return `
      <div class="registration-form">
        <h2>Вход</h2>
        <form id="form" action="submit">
          {{{Input id="login" label="Логин" type="text" }}}
          {{{Input id="password" label="Пароль" type="password" }}}
          {{{Button label="Авторизоваться"}}}
        </form>
        <div class="registration-link">
          <a href="/registration">Нет аккаунта?</a>
        </div>
      </div>
      `;
  }
}
export default LoginPage;
