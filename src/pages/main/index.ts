import { Block } from "core";

class MainPage extends Block {
  render() {
    return `
      <nav class="main-menu">
        <ul>
          <li><a href="/auth">Авторизация</a></li>
          <li><a href="/registration">Регистрация</a></li>
          <li><a href="/chat">Чат</a></li>
          <li><a href="/profile">Профиль</a></li>
          <li><a href="/settings">Настройки</a></li>
        </ul>
      </nav>
      `;
  }
}
export default MainPage;
