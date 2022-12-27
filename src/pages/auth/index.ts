import { Block } from "core";

// Helpers
import { VALIDATORS_MAP, concatValidators } from "helpers/validator";

import "./auth.scss";

const INIT_STATE = {
  values: {
    login: "",
    password: "",
  },
  errors: {
    login: "",
    password: "",
  },
};

const VALIDATE_FORM = ({ login, password }) => ({
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

class LoginPage extends Block {
  protected getStateFromProps(props: any): void {
    this.state = {
      ...INIT_STATE,

      resetErrors: () => {
        if (this.state.errors.login || this.state.errors.password) {
          this.setState({
            values: { ...this.state.values },
            errors: { ...INIT_STATE.errors },
          });
        }
      },
      // onInput: (e) => {
      //   this.setState({
      //     ...this.state,
      //     errors: VALIDATE_FORM({
      //       login: this.state.values.login,
      //       password: this.state.values.password,
      //     }),
      //     values: {
      //       ...this.state.values,
      //       [e.target.id]: e.target.value || "",
      //     },
      //   });
      // },
      // onBlur: () => {
      //   // this.setState({
      //   //   ...this.state,
      //   //   errors: VALIDATE_FORM({
      //   //     login: this.state.values.login,
      //   //     password: this.state.values.password,
      //   //   }),
      //   // });
      //   // console.log(this.refs.loginRef);
      // },
      onFocus: () => {
        this.state.resetErrors();
      },
      onLogin: () => {
        const formData = {
          login: (this.refs.loginRef.lastElementChild as HTMLInputElement)
            .value,
          password: (this.refs.passwordRef.lastElementChild as HTMLInputElement)
            .value,
        };

        const errors = VALIDATE_FORM({
          login: formData.login,
          password: formData.password,
        });

        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (errors.login || errors.password) return;

        console.log(formData);
      },
    };
  }

  render() {
    const { errors, values } = this.state;
    return `
      <div class="registration-form">
        <h2>Вход</h2>
        <div>
          {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
          {{{InputControll placeHolder="Пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" ref="passwordRef" label="Введите пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
          {{{Button label="Авторизоваться" onClick=onLogin}}}
        </div>
        <div class="registration-link">
          <a href="/registration">Нет аккаунта?</a>
        </div>
      </div>
      `;
  }
}
export default LoginPage;
