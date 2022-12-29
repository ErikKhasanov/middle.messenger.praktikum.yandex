import { Block } from "core";

import { REGISTRATION_VALIDATOR } from "helpers/validator/registrationValidator";

import BackImg from "../../assets/back_btn.svg";

interface IForm {
  values: {
    email: string;
    login: string;
    phone: string;
    firstName: string;
    secondName: string;
    password: string;
  };
  errors: {
    email: string;
    login: string;
    phone: string;
    firstName: string;
    secondName: string;
    password: string;
  };
}

const INIT_STATE: IForm = {
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
  getInputsValues(): IForm["values"] {
    return {
      login: (this.refs.loginRef.lastElementChild as HTMLInputElement).value,
      email: (this.refs.emailRef.lastElementChild as HTMLInputElement).value,
      phone: (this.refs.phoneRef.lastElementChild as HTMLInputElement).value,
      firstName: (this.refs.firsNameRef.lastElementChild as HTMLInputElement)
        .value,
      secondName: (this.refs.secondNameRef.lastElementChild as HTMLInputElement)
        .value,
      password: (this.refs.passwordRef.lastElementChild as HTMLInputElement)
        .value,
    };
  }

  validateForm(formData: IForm["values"]): IForm["errors"] {
    return REGISTRATION_VALIDATOR({
      login: formData.login,
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      secondName: formData.secondName,
      password: formData.password,
    });
  }

  protected getStateFromProps(props: any): void {
    this.state = {
      ...INIT_STATE,

      onBlur: (e) => {
        const field = e.target.id as keyof IForm["values"];
        //TODO сделать валидацию по одному полю
        const values = this.getInputsValues();
        const error = this.validateForm(values)[field];
        const nextState = {
          values: { ...values },
          errors: { ...this.state.errors, [field]: error },
        };
        this.setState(nextState);
      },

      onFocus: (e) => {
        const field = e.target.id as keyof IForm["values"];
        if (!this.state.errors[field]) return;
        const label = document.forms.settings.elements[field].labels[0];
        label.removeChild(label.lastElementChild);
      },

      onInput: (e) => {
        const field = e.target.id as keyof IForm["values"];
        const value = e.target.value;
        document.forms.settings.elements[field].setAttribute("value", value);
      },

      onRegistration: () => {
        const formData = this.getInputsValues();
        const errors = this.validateForm(formData);

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
        <form name="settings" id="form">
          {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" name="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
          {{{InputControll placeHolder="Введите электронную почту" onInput=onInput onBlur=onBlur onFocus=onFocus id="email" name="email" ref="emailRef" label="Электронная почта" type="text" inputValue="${values.email}" errorText="${errors.email}" }}}
          {{{InputControll placeHolder="Введите номер телефона" onInput=onInput onBlur=onBlur onFocus=onFocus id="phone" ref="phoneRef" label="Телефон" type="text" inputValue="${values.phone}" errorText="${errors.phone}" }}}
          {{{InputControll placeHolder="Введите ваше имя" onInput=onInput onBlur=onBlur onFocus=onFocus id="firstName" name="first_name" ref="firsNameRef" label="Имя" type="text" inputValue="${values.firstName}" errorText="${errors.firstName}" }}}
          {{{InputControll placeHolder="Введите вашу фамилию" onInput=onInput onBlur=onBlur onFocus=onFocus id="secondName"  name="second_name" ref="secondNameRef" label="Фамилия" type="text" inputValue="${values.secondName}" errorText="${errors.secondName}" }}}
          {{{InputControll placeHolder="Введите пароль" onInput=onInput onBlur=onBlur onFocus=onFocus id="password" name="password" ref="passwordRef" label="Пароль" type="password" inputValue="${values.password}" errorText="${errors.password}" }}}
          {{{Button label="Изменить данные" onClick=onRegistration}}}
        </form>
      </div>
  </div>
        `;
  }
}

export default SettingsPage;
