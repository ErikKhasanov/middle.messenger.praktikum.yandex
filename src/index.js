import { renderDOM, registerComponent } from "./core";

// Styles
import "./styles/main.scss";

// Components
import Button from "./components/Button";
import Input from "./components/Input";
import Chat from "./components/Chat";
import ProfileSetting from "./components/ProfileSetting";

// Pages
import NotFoundPage from "./pages/404";
import ErrorPage from "./pages/500";
import LoginPage from "./pages/auth";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import RegistrationPage from "./pages/registration";

registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);
registerComponent(ProfileSetting);

const ROUTES_MAP = {
  "/": new LoginPage(),
  "/auth": new LoginPage(),
  "/registration": new RegistrationPage(),
  "/chat": new ChatPage(),
  "/profile": new ProfilePage(),
};

function router() {
  const path = window.location.pathname;
  if (ROUTES_MAP[path]) {
    try {
      renderDOM(ROUTES_MAP[path]);
    } catch (err) {
      renderDOM(new ErrorPage());
      console.error(err);
    }
    return;
  }
  renderDOM(new NotFoundPage());
}

document.addEventListener("DOMContentLoaded", () => {
  // Init router
  router();
});
