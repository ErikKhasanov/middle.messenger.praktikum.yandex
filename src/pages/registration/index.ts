import { Block } from "../../core";

class RegistrationPage extends Block {
  render() {
    return `
    <div class="registration-form">
    <h2>Регистрация</h2>
    <form id="form" action="submit">
      {{{Input id="email" label="Электронная почта" type="text"}}}
      {{{Input id="login" label="Логин" type="text"}}}
      {{{Input id="login" label="Логин" type="text"}}}
      {{{Input id="password2" label="Пароль (ещё раз)" type="pasword"}}}
      {{{Button label="Зарегистрироваться"}}}
    </form>
    <div class="registration-link">
      <a href="/auth">Войти</a>
    </div>
  </div>
        `;
  }
}

export default RegistrationPage;
