import { Block } from "../../core";

class LoginPage extends Block {
  render() {
    // language=hbs
    return `
      <div class="screen screen_theme_full">
        <div class="screen__content">
          {{{Button text="Login"}}}
          <div>
            {{{Link text="Login" to="/login"}}}
            {{{Link text="Sign Up" to="/signup"}}}
          </div>
        </div>
      </div>
      `;
  }
}
export default LoginPage;
