/* eslint-disable no-unused-vars */
import { Block, AppStore } from 'core';
import UserController from 'controllers/UserController';

import connectStore from 'HOC/connectStore';

import { DEFAULT_AVATAR } from 'configs/config';

interface IProfilePageProps {
  user: User;
}

class ProfilePage extends Block<IProfilePageProps> {
  protected getStateFromProps(_props: any): void {
    this.state = {
      onLogout: () => {
        AppStore.dispatch(UserController.logout);
      },
    };
  }

  render() {
    const { login, email, phone, first_name, second_name, display_name, avatar } = this.props.user;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2/resources/${avatar}` : DEFAULT_AVATAR;
    return `
    {{#Layout isLoading=store.state.isLoading}}
      <main>
      <div class="profile">
      <div class="profile_bar">
        {{{Link label="Назад" route="/messenger"}}}
      </div>
      <div class="profile_wrapper">
        <div class="profile_inner">
          <div class="profile-avatar">
            <img src="${avatarUrl}" alt="" />
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
    {{/Layout}}
        `;
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});
export default connectStore(mapStateToProps)(ProfilePage);
