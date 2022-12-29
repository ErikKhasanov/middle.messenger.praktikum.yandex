import { Block } from "core";

class NotFoundPage extends Block {
  render() {
    return `
    <main>
    <div class="error-wrapper">
    <div class="error-wrapper__content">
    <img src="assets/404.png" alt="404" />
    <h1>404</h1>
    <p>Чегоо?! страница не найдена</p>
    <a class="back-link" href="/">Назад к чатам</a>
    </div>
    </div>
    </main>
      `;
  }
}
export default NotFoundPage;
