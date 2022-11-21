import { renderDOM, registerComponent } from "./core";

import "./styles/main.scss";

import Button from "./components/Button";
import LoginPage from "./pages/auth";

registerComponent(Button);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage());
});
