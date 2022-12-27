import { Block } from "core";

import { VALIDATORS_MAP, concatValidators } from "helpers/validator";

const INIT_STATE = {
  values: {
    email: "",
    login: "",
    password: "",
  },
  errors: {
    email: "",
    login: "",
    password: "",
  },
};

const VALIDATE_FORM = ({ login, password, email }) => ({
  login: concatValidators([
    VALIDATORS_MAP.maxLength({
      value: login,
      maxLength: 20,
      errorMessage: "Вы ввели максимальное количество символов",
    }),
    VALIDATORS_MAP.minLength({
      value: login,
      minLength: 3,
      errorMessage: "Вы ввели минимальное количество символов",
    }),
    VALIDATORS_MAP.login({
      value: login,
    }),
  ]),
  email: concatValidators([
    VALIDATORS_MAP.email({
      value: email,
    }),
  ]),
  password: concatValidators([
    VALIDATORS_MAP.minLength({
      value: password,
      minLength: 8,
      errorMessage: "Пароль должен содержать от 8 до 40 символов",
    }),
    VALIDATORS_MAP.maxLength({
      value: password,
      maxLength: 40,
      errorMessage: "Пароль должен содержать от 8 до 40 символов",
    }),
  ]),
});

class RegistrationPage extends Block {
  protected getStateFromProps(props: any): void {
    this.state = {
      ...INIT_STATE,

      onRegistration: () => {
        const formData = {
          login: (this.refs.loginRef.lastElementChild as HTMLInputElement)
            .value,
          email: (this.refs.emailRef.lastElementChild as HTMLInputElement)
            .value,
          password: (this.refs.passwordRef.lastElementChild as HTMLInputElement)
            .value,
        };

        const errors = VALIDATE_FORM({
          login: formData.login,
          email: formData.email,
          password: formData.password,
        });

        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (errors.email || errors.login || errors.password) return;

        console.log(formData);
      },
    };
  }
  render() {
    const { values, errors } = this.state;
    return `
    <div class="registration-form">
    <h2>Регистрация</h2>
    <div id="form">
      {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
      {{{InputControll placeHolder="Введите электронную почту" onInput=onInput onBlur=onBlur onFocus=onFocus id="email" ref="emailRef" label="Электронная почта" type="text" inputValue="${values.email}" errorText="${errors.email}" }}}
      {{{InputControll placeHolder="Введите пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" ref="passwordRef" label="Пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
      {{{Button label="Зарегистрироваться" onClick=onRegistration}}}
    </div>
    <div class="registration-link">
      <a href="/auth">Войти</a>
    </div>
  </div>
        `;
  }
}

export default RegistrationPage;
