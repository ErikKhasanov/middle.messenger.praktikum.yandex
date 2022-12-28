import { renderDOM, registerComponent } from "core";

// Styles
import "styles/main.css";

// Components
import Button from "components/Button";
import InputControll, {
  ErrorComponent,
  LabelComponent,
  InputComponent,
} from "components/InputControll";
import ChatComponent from "components/Chat";
import ProfileSetting from "components/ProfileSetting";

// Pages
import MainPage from "pages/main";
import NotFoundPage from "pages/404";
import ErrorPage from "pages/500";
import LoginPage from "pages/auth";
import ChatPage from "pages/chat";
import ProfilePage from "pages/profile";
import RegistrationPage from "pages/registration";
import SettingsPage from "pages/settings";

registerComponent(Button);
registerComponent(InputComponent);
registerComponent(ErrorComponent);
registerComponent(LabelComponent);
registerComponent(InputControll);
registerComponent(ChatComponent);
registerComponent(ProfileSetting);

const ROUTES_MAP = {
  "/": new MainPage(),
  "/login": new LoginPage(),
  "/auth": new LoginPage(),
  "/registration": new RegistrationPage(),
  "/chat": new ChatPage(),
  "/profile": new ProfilePage(),
  "/settings": new SettingsPage(),
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
