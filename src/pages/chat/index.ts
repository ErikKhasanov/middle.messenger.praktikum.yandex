import Block from "../../core/Block";

class ChatPage extends Block {
  render() {
    //language=hbs
    return `
    <div class="layout">
        <div class="sidebar">
            <div class="profile-link">
                <a href="/profile">Профиль</a>
            </div>
            <div class="search">
                {{{Input id="search" label="Поиск"}}}
            </div>
            <div class="chats-wrapper">
                {{{Chat name="Снупп Догг" message="Друзья у меня для вас новый релиз" avatar="https://avatars.mds.yandex.net/i?id=e7c1240fdddb1e6feb36eb0d9e82a707-4438849-images-thumbs&n=13"}}}
            </div>
        </div>
        <div class="messages">
            <span class="select-chat">Выберите чат чтобы отправить сообщение</span>
        </div>
    </div>
        `;
  }
}

export default ChatPage;
