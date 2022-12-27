import { Block } from "core";

import ErrorImg from "../../assets/404.png";

class ErrorPage extends Block {
  render() {
    // language=hbs
    return `
    <div class="error-wrapper">
        <div class="error-wrapper__content">
        <img src=${ErrorImg} alt="404" />
        <h1>500</h1>
        <p>Упс... произошла ошибка</p>
        <a class="back-link" href="/">Назад к чатам</a>
        </div>
    </div>
      `;
  }
}
export default ErrorPage;
