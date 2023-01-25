/* eslint-disable no-unused-vars */
import { Block } from 'core';
import UserController from 'controllers/UserController';

import { withStore } from 'HOC/withStore';

class ProfilePage extends Block {
  protected getStateFromProps(_props: any): void {
    this.state = {
      onLogout: () => {
        this.props.store.dispatch(UserController.logout);
      },
    };
  }

  render() {
    const { login, email, phone, first_name, second_name, display_name, avatar } = this.props.store.state.user;
    return `
    <main>
    <div class="profile">
    <div class="profile_bar">
      {{{Link label="Назад" route="/messenger"}}}
    </div>
    <div class="profile_wrapper">
      <div class="profile_inner">
        <div class="profile-avatar">
          {{#if avatar}}
            <img src="./assets/avatar.svg" alt="" />
          {{/if}}
          {{#unless avatar}}
            <img src="https://via.placeholder.com/100" alt="" />
          {{/unless}}
          Аватар
        </div>
        {{{ProfileSetting label="Почта" value="${email}"}}}
        {{{ProfileSetting label="Логин" value="${login}"}}}
        {{{ProfileSetting label="Имя" value="${first_name}"}}}
        {{{ProfileSetting label="Фамилия" value="${second_name}"}}}
        {{{ProfileSetting label="Отоброжаемое имя" value="${display_name}"}}}
        {{{ProfileSetting label="Телефон" value="${phone}"}}}
        <div class="profile-change">
          {{{Link label="Изменить данные" route="/settings"}}}
          {{{Button label="Выйти" onClick=onLogout}}}
      </div>
      </div>
    </div>
    </div>
    </main>
        `;
  }
}

export default withStore(ProfilePage);
