import { Block } from 'core';

import UserController from 'controllers/UserController';

// Helpers
import { VALIDATORS_MAP, concatValidators } from 'helpers/validator/validators';

import './auth.css';
import { withStore } from 'HOC/withStore';

interface IAuthValidateForm {
  login: string;
  password: string;
}

interface IForm {
  values: {
    login: string;
    password: string;
  };
  errors: {
    login: string;
    password: string;
  };
}

const INIT_STATE: IForm = {
  values: {
    login: '',
    password: '',
  },
  errors: {
    login: '',
    password: '',
  },
};

const VALIDATE_FORM = ({ login, password }: IAuthValidateForm) => ({
  login: concatValidators([
    VALIDATORS_MAP.required({ value: login }),
    VALIDATORS_MAP.maxLength({
      value: login,
      maxLength: 20,
      errorMessage: 'Вы ввели максимальное количество символов',
    }),
    VALIDATORS_MAP.minLength({
      value: login,
      minLength: 3,
      errorMessage: 'Вы ввели минимальное количество символов',
    }),
    VALIDATORS_MAP.login({
      value: login,
    }),
  ]),
  password: concatValidators([
    VALIDATORS_MAP.required({ value: login }),
    VALIDATORS_MAP.minLength({
      value: password,
      minLength: 8,
      errorMessage: 'Пароль должен содержать от 8 до 40 символов',
    }),
    VALIDATORS_MAP.maxLength({
      value: password,
      maxLength: 40,
      errorMessage: 'Пароль должен содержать от 8 до 40 символов',
    }),
  ]),
});

class SigninPage extends Block {
  getInputsValues(): IForm['values'] {
    return {
      login: (this.refs.loginRef.lastElementChild as HTMLInputElement).value,
      password: (this.refs.passwordRef.lastElementChild as HTMLInputElement).value,
    };
  }

  validateForm(formData: IForm['values']) {
    return VALIDATE_FORM({
      login: formData.login,
      password: formData.password,
    });
  }

  protected getStateFromProps(): void {
    this.state = {
      ...INIT_STATE,

      onBlur: e => {
        const field = e.target.id as keyof IForm['values'];
        // TODO сделать валидацию по одному полю
        const values = this.getInputsValues();
        const error = this.validateForm(values)[field];
        const nextState = {
          values: { ...values },
          errors: { ...this.state.errors, [field]: error },
        };
        this.setState(nextState);
      },

      onFocus: e => {
        const field = e.target.id as keyof IForm['values'];
        if (!this.state.errors[field]) return;
        const label = document.forms.loginForm.elements[field].labels[0];
        label.removeChild(label.lastElementChild);
      },

      onInput: e => {
        const field = e.target.id as keyof IForm['values'];
        const { value } = e.target;
        document.forms.loginForm.elements[field].setAttribute('value', value);
      },

      onLogin: () => {
        const formData = this.getInputsValues();
        const errors = this.validateForm(formData);
        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (errors.login || errors.password) return;

        this.props.store.dispatch(UserController.signin, formData);

        console.log(formData);
      },
    };
  }

  render() {
    const { errors, values } = this.state;

    return `
    {{#Layout isLoading=store.state.isLoading}}
      <main>
        <div class="registration-form">
        <h2>Вход</h2>
        <form name="loginForm">
          {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" name="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}"  errorText="${errors.login}" }}}
          {{{InputControll placeHolder="Пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" ref="passwordRef" label="Введите пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
          {{{Button label="Авторизоваться" onClick=onLogin}}}
        </form>
        <div class="registration-link">
          {{{Link label="Нет аккаунта?" route="/sign-up"}}}
        </div>
        </div>
      </main>
    {{/Layout}}
      `;
  }
}
export default withStore(SigninPage);
