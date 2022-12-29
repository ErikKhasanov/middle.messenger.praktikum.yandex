import { Block } from "core";

class MainPage extends Block {
  render() {
    return `
      <main>
      <nav class="main-menu">
      <ul>
        <li><a href="/login">Авторизация</a></li>
        <li><a href="/registration">Регистрация</a></li>
        <li><a href="/chat">Чат</a></li>
        <li><a href="/profile">Профиль</a></li>
        <li><a href="/settings">Настройки</a></li>
      </ul>
    </nav>
      </main>
      `;
  }
}
export default MainPage;
