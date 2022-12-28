import { Block } from "core";

import BackImg from "../../assets/back_btn.svg";

class ProfilePage extends Block {
  render() {
    return `
    <div class="profile">
      <div class="profile_bar">
        <a href="/chat">
          <img src=${BackImg} alt="" />
        </a>
      </div>
      <div class="profile_wrapper">
        <div class="profile_inner">
          <div class="profile-avatar">
            <img src="./assets/avatar.svg" alt="" />
            Аватар
          </div>
          {{{ProfileSetting label="Почта" value="erikkhasanov@yandex.ru"}}}
          {{{ProfileSetting label="Логин" value="Login"}}}
          {{{ProfileSetting label="Имя" value="Иван"}}}
          {{{ProfileSetting label="Фамилия" value="Иванов"}}}
          {{{ProfileSetting label="Имя в чате" value="Иван"}}}
          {{{ProfileSetting label="Телефон" value="+7(999)1212121"}}}
          <div class="profile-change">
            <a href="/settings">Изменить данные</a>
            <a href="/chat">Выйти</a>
        </div>
        </div>
      </div>
  </div>
        `;
  }
}

export default ProfilePage;
