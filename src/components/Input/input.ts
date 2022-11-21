import Block from "../../core/Block";

interface IInput {
  id: string;
  type: string;
  label: string;
  onInput: () => void;
}

export class Input extends Block {
  constructor({ id, type, label, onInput }: IInput) {
    super(
      { id: id, type: type, label: label, events: { onInput: onInput } },
      "div"
    );
  }
  render(): string {
    return `
    <input value="" id={{id}} type={{type}} />
    <label class="placeholder-text" for={{id}}>{{label}}</label>`;
  }
}
