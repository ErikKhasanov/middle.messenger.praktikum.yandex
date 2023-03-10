import { Block, AppStore, AppRouter } from 'core';

import UserController from 'controllers/UserController';

import REGISTRATION_VALIDATOR from 'helpers/validator/registrationValidator';

interface IForm {
  values: {
    email: string;
    login: string;
    phone: string;
    first_name: string;
    second_name: string;
    password: string;
  };
  errors: {
    email: string;
    login: string;
    phone: string;
    first_name: string;
    second_name: string;
    password: string;
  };
}

const INIT_STATE: IForm = {
  values: {
    email: '',
    login: '',
    phone: '',
    first_name: '',
    second_name: '',
    password: '',
  },
  errors: {
    email: '',
    login: '',
    phone: '',
    first_name: '',
    second_name: '',
    password: '',
  },
};

class SignupPage extends Block {
  getInputsValues(): IForm['values'] {
    return {
      login: (this.refs.loginRef.node.lastElementChild as HTMLInputElement).value,
      email: (this.refs.emailRef.node.lastElementChild as HTMLInputElement).value,
      phone: (this.refs.phoneRef.node.lastElementChild as HTMLInputElement).value,
      first_name: (this.refs.firsNameRef.node.lastElementChild as HTMLInputElement).value,
      second_name: (this.refs.secondNameRef.node.lastElementChild as HTMLInputElement).value,
      password: (this.refs.passwordRef.node.lastElementChild as HTMLInputElement).value,
    };
  }

  validateForm(formData: IForm['values']): IForm['errors'] {
    return REGISTRATION_VALIDATOR({
      login: formData.login,
      email: formData.email,
      phone: formData.phone,
      first_name: formData.first_name,
      second_name: formData.second_name,
      password: formData.password,
    });
  }

  protected getStateFromProps(): void {
    this.state = {
      ...INIT_STATE,

      onBlur: (e: InputTarget) => {
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

      onFocus: (e: InputTarget) => {
        const field = e?.target?.id as keyof IForm['values'];
        if (!this.state.errors[field]) return;
        const label = (document.forms as any).registration.elements[field].labels[0];
        label.removeChild(label.lastElementChild);
      },

      onInput: (e: InputTarget) => {
        const field = e.target.id as keyof IForm['values'];
        const { value } = e.target;
        (document.forms as any).registration.elements[field].setAttribute('value', value);
      },

      onRegistration: (e: InputEvent) => {
        e.preventDefault();
        const formData = this.getInputsValues();
        const errors = this.validateForm(formData);

        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (errors.email || errors.login || errors.password || errors.phone || errors.first_name || errors.second_name) {
          return;
        }
        AppStore.dispatch(UserController.signup, formData);
      },
    };
  }

  render() {
    const { values, errors } = this.state;
    return `
    {{#Layout isLoading=store.state.isLoading}}
      <main>
        <div class="registration-form">
          <h2>Регистрация</h2>
          <form name="registration" class="form">
            {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" name="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
            {{{InputControll placeHolder="Введите электронную почту" onInput=onInput onBlur=onBlur onFocus=onFocus id="email" name="email" ref="emailRef" label="Электронная почта" type="text" inputValue="${values.email}" errorText="${errors.email}" }}}
            {{{InputControll placeHolder="Введите номер телефона" onInput=onInput onBlur=onBlur onFocus=onFocus id="phone" name="phone" ref="phoneRef" label="Телефон" type="text" inputValue="${values.phone}" errorText="${errors.phone}" }}}
            {{{InputControll placeHolder="Введите ваше имя" onInput=onInput onBlur=onBlur onFocus=onFocus id="firstName" name="first_name" ref="firsNameRef" label="Имя" type="text" inputValue="${values.first_name}" errorText="${errors.first_name}" }}}
            {{{InputControll placeHolder="Введите вашу фамилию" onInput=onInput onBlur=onBlur onFocus=onFocus id="secondName" name="second_name" ref="secondNameRef" label="Фамилия" type="text" inputValue="${values.second_name}" errorText="${errors.second_name}" }}}
            {{{InputControll placeHolder="Введите пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" name="password" ref="passwordRef" label="Пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
            {{{Button label="Зарегистрироваться" onClick=onRegistration}}}
          </form>
          <div class="registration-link">
            {{{Link label="Войти" route="/signin"}}}
          </div>
        </div>
      </main>
    {{/Layout}}
        `;
  }
}

export default SignupPage;
