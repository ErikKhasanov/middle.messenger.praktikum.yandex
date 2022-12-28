import Block from "core/Block";

import { VALIDATORS_MAP, concatValidators } from "helpers/validator/validators";

const INIT_STATE = {
  values: {
    message: "",
  },
  errors: {
    message: "",
  },
};

const VALIDATE_FORM = ({ value }) => ({
  message: concatValidators([VALIDATORS_MAP.required({ value })]),
});

class ChatPage extends Block {
  protected getStateFromProps(props: any): void {
    this.state = {
      ...INIT_STATE,
      onMessage: () => {
        const formData = {
          message: (this.refs.messageRef.lastElementChild as HTMLInputElement)
            .value,
        };

        const errors = VALIDATE_FORM({ value: formData.message });

        this.setState({
          ...this.state,
          errors: { ...errors },
        });

        if (errors.message) return;

        console.log(formData);
      },
    };
  }

  render() {
    const { values, errors } = this.state;

    return `
    <div class="layout">
        <div class="sidebar">
            <div class="profile-link">
                <a href="/profile">Профиль</a>
            </div>
            <div class="search">
                {{{InputControll placeHolder="Поиск" onInput=onInput onBlur=onBlur onFocus=onFocus id="search" ref="messageRef" label="Поиск" type="text"  inputValue="" errorText="" }}}
            </div>
            <div class="chats-wrapper">
                {{{ChatComponent name="Снупп Догг" message="Друзья у меня для вас новый релиз" avatar="https://avatars.mds.yandex.net/i?id=e7c1240fdddb1e6feb36eb0d9e82a707-4438849-images-thumbs&n=13"}}}
            </div>
        </div>
        <div class="messages">
            <div class="messages_input">
                {{{InputControll placeHolder="Введите сообщение" onInput=onInput onBlur=onBlur onFocus=onFocus id="message" ref="messageRef" type="text"  inputValue="${values.message}" errorText="${errors.message}" }}}
                {{{Button label="Отправить" onClick=onMessage}}}
            </div>
        </div>
    </div>
        `;
  }
}

export default ChatPage;
