import { Block } from "core";

import { REGISTRATION_VALIDATOR } from "helpers/validator/registrationValidator";

import BackImg from "../../assets/back_btn.svg";

const INIT_STATE = {
  values: {
    email: "",
    login: "",
    phone: "",
    firstName: "",
    secondName: "",
    password: "",
  },
  errors: {
    email: "",
    login: "",
    phone: "",
    firstName: "",
    secondName: "",
    password: "",
  },
};

class SettingsPage extends Block {
  protected getStateFromProps(props: any): void {
    this.state = {
      ...INIT_STATE,

      onRegistration: () => {
        const formData = {
          login: (this.refs.loginRef.lastElementChild as HTMLInputElement)
            .value,
          email: (this.refs.emailRef.lastElementChild as HTMLInputElement)
            .value,
          phone: (this.refs.phoneRef.lastElementChild as HTMLInputElement)
            .value,
          firstName: (
            this.refs.firsNameRef.lastElementChild as HTMLInputElement
          ).value,
          secondName: (
            this.refs.secondNameRef.lastElementChild as HTMLInputElement
          ).value,
          password: (this.refs.passwordRef.lastElementChild as HTMLInputElement)
            .value,
        };

        const errors = REGISTRATION_VALIDATOR({
          login: formData.login,
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          secondName: formData.secondName,
          password: formData.password,
        });

        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (
          errors.email ||
          errors.login ||
          errors.password ||
          errors.phone ||
          errors.firstName ||
          errors.secondName
        ) {
          return;
        }

        console.log(formData);
      },
    };
  }

  render() {
    const { values, errors } = this.state;

    return `
    <div class="profile">
      <div class="profile_bar">
        <a href="/chat">
          <img src=${BackImg} alt="" />
        </a>
      </div>
      <div class="profile_wrapper">
        <div class="profile_inner">
        <div id="form">
          {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
          {{{InputControll placeHolder="Введите электронную почту" onInput=onInput onBlur=onBlur onFocus=onFocus id="email" ref="emailRef" label="Электронная почта" type="text" inputValue="${values.email}" errorText="${errors.email}" }}}
          {{{InputControll placeHolder="Введите номер телефона" onInput=onInput onBlur=onBlur onFocus=onFocus id="phone" ref="phoneRef" label="Телефон" type="text" inputValue="${values.phone}" errorText="${errors.phone}" }}}
          {{{InputControll placeHolder="Введите ваше имя" onInput=onInput onBlur=onBlur onFocus=onFocus id="first_name" ref="firsNameRef" label="Имя" type="text" inputValue="${values.firstName}" errorText="${errors.firstName}" }}}
          {{{InputControll placeHolder="Введите вашу фамилию" onInput=onInput onBlur=onBlur onFocus=onFocus id="second_name" ref="secondNameRef" label="Фамилия" type="text" inputValue="${values.secondName}" errorText="${errors.secondName}" }}}
          {{{InputControll placeHolder="Введите пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" ref="passwordRef" label="Пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
          {{{Button label="Изменить данные" onClick=onRegistration}}}
        </div>
      </div>
  </div>
        `;
  }
}

export default SettingsPage;
