import { Block } from "../../core";

export class ProfileSetting extends Block {
  render() {
    return `
    <div class="profile-info">
    <div class="profile-info__line">
      <span>{{label}}</span>
      <span>{{value}}</span>
    </div>
  </div>
        `;
  }
}
