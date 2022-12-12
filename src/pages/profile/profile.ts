import { Block } from "../../core";

export class ProfilePage extends Block {
  render() {
    return `
    <div class="profile">
    <div class="back-bar">
      <a href="/chat">
        <img src="./assets/back_btn.svg" alt="" />
      </a>
    </div>
    <div class="profile-wrapper">
      <div class="profile-inner">
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
          <a href="/">Изменить данные</a>
          <a href="/">Изменить пароль</a>
          <a href="/">Выйти</a>
      </div>
      </div>
    </div>
  </div>
        `;
  }
}
