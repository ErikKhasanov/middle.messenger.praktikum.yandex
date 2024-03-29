/* eslint-disable no-unused-vars */
import { Block } from 'core';

import PROFILE_VALIDATOR from 'helpers/validator/profileValidators';
import { withStore } from 'HOC/withStore';

import UsersController from 'controllers/UsersController';

import { DEFAULT_AVATAR } from 'configs/config';

interface IForm {
  values: {
    email: string;
    login: string;
    phone: string;
    first_name: string;
    second_name: string;
    display_name: string;
  };
  errors: {
    email: string;
    login: string;
    phone: string;
    first_name: string;
    second_name: string;
    display_name: string;
  };
}

const INIT_STATE: IForm = {
  values: {
    email: '',
    login: '',
    phone: '',
    first_name: '',
    second_name: '',
    display_name: '',
  },
  errors: {
    email: '',
    login: '',
    phone: '',
    first_name: '',
    second_name: '',
    display_name: '',
  },
};

class SettingsPage extends Block {
  componentDidMount(props: any): void {
    const { email, login, first_name, second_name, phone, display_name } = this.props.store.state.user;
    this.setState({
      values: {
        email: email,
        login: login,
        phone: phone,
        first_name: first_name,
        second_name: second_name,
        display_name: display_name || '',
      },
    });
  }

  getInputsValues(): IForm['values'] {
    return {
      login: (this.refs.loginRef.lastElementChild as HTMLInputElement).value,
      email: (this.refs.emailRef.lastElementChild as HTMLInputElement).value,
      phone: (this.refs.phoneRef.lastElementChild as HTMLInputElement).value,
      first_name: (this.refs.firsNameRef.lastElementChild as HTMLInputElement).value,
      second_name: (this.refs.secondNameRef.lastElementChild as HTMLInputElement).value,
      display_name: (this.refs.displayNameRef.lastElementChild as HTMLLIElement).value,
    };
  }

  validateForm(formData: IForm['values']): IForm['errors'] {
    return PROFILE_VALIDATOR({
      login: formData.login,
      email: formData.email,
      phone: formData.phone,
      first_name: formData.first_name,
      second_name: formData.second_name,
      display_name: formData.display_name,
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
        const label = document.forms.settings.elements[field].labels[0];
        label.removeChild(label.lastElementChild);
      },

      onInput: e => {
        const field = e.target.id as keyof IForm['values'];
        const { value } = e.target;
        document.forms.settings.elements[field].setAttribute('value', value);
      },

      onChangeProfile: () => {
        const formData = this.getInputsValues();
        const errors = this.validateForm(formData);

        const nextState = {
          errors: { ...errors },
          values: { ...formData },
        };

        this.setState(nextState);

        if (errors.email || errors.login || errors.phone || errors.first_name || errors.second_name || errors.display_name) {
          return;
        }

        this.props.store.dispatch(UsersController.changeProfile, formData);
        console.log(formData);
      },

      onChangeAvatar: e => {
        e.preventDefault();
        const avatar = document.getElementById('avatar').files[0];
        const form = new FormData();
        form.append('avatar', avatar);
        console.log(form);
        this.props.store.dispatch(UsersController.changeAvatar, form);
      },

      onChangePassword: () => {
        // TODO сделать валидацию
        const oldPassword = prompt('Введите старый пароль');
        const newPassword = prompt('Введите новый пароль');
        this.props.store.dispatch(UsersController.changePassword, {
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
      },
    };
  }

  render() {
    const { values, errors } = this.state;
    const { avatar } = this.props.store.state.user;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : DEFAULT_AVATAR;

    return `
      {{#Layout isLoading=store.state.isLoading}}
        <div class="profile">
        <div class="profile_bar">
          {{{Link label="Назад" route="/profile"}}}
        </div>
        <div class="profile_wrapper">
          <div class="profile-inner">
            <div class="profile-avatar">
                <img src="${avatarUrl}" alt="" />
              Аватар
            </div>
            {{{FileForm label="Изменить аватар" id="avatar" name="avatar" onSubmit=onChangeAvatar}}}
          </div>
          <div class="profile_inner">
            <form name="settings" id="form">
              {{{InputControll placeHolder="Введите логин" onInput=onInput onBlur=onBlur onFocus=onFocus id="login" name="login" ref="loginRef" label="Логин" type="text" inputValue="${values.login}" errorText="${errors.login}" }}}
            {{{InputControll placeHolder="Введите отображаемое имя" onInput=onInput onBlur=onBlur onFocus=onFocus id="displayName" name="displayName" ref="displayNameRef" label="Отображаемое имя" type="text" inputValue="${values.display_name}" errorText="${errors.display_name}" }}}
            {{{InputControll placeHolder="Введите электронную почту" onInput=onInput onBlur=onBlur onFocus=onFocus id="email" name="email" ref="emailRef" label="Электронная почта" type="text" inputValue="${values.email}" errorText="${errors.email}" }}}
            {{{InputControll placeHolder="Введите номер телефона" onInput=onInput onBlur=onBlur onFocus=onFocus id="phone" ref="phoneRef" label="Телефон" type="text" inputValue="${values.phone}" errorText="${errors.phone}" }}}
            {{{InputControll placeHolder="Введите ваше имя" onInput=onInput onBlur=onBlur onFocus=onFocus id="first_name" name="first_name" ref="firsNameRef" label="Имя" type="text" inputValue="${values.first_name}" errorText="${errors.first_name}" }}}
            {{{InputControll placeHolder="Введите вашу фамилию" onInput=onInput onBlur=onBlur onFocus=onFocus id="second_name"  name="second_name" ref="secondNameRef" label="Фамилия" type="text" inputValue="${values.second_name}" errorText="${errors.second_name}" }}}
            {{{Button label="Изменить данные" onClick=onChangeProfile}}}
          </form>
        </div>
        <div class="profile_inner">
          {{{Button label="Изменить пароль" onClick=onChangePassword}}}
        </div>
        </div>
      {{/Layout}}
        `;
  }
}

export default withStore(SettingsPage);
