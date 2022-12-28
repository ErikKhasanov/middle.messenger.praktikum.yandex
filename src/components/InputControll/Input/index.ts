import Block from "core/Block";

interface IInputComponent {
  id: string;
  type?: "text" | "number" | "password" | "email";
  placeHolder?: string;
  inputValue: string | number;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class InputComponent extends Block {
  static componentName = "InputComponent";

  constructor({
    id,
    type,
    placeHolder,
    inputValue,
    onInput,
    onFocus,
    onBlur,
  }: IInputComponent) {
    super({
      id,
      type,
      placeHolder,
      inputValue,
      events: { input: onInput, focus: onFocus, blur: onBlur },
    });
  }

  render(): string {
    return `<input class="input-controlled_input" value="{{inputValue}}" placeholder="{{placeHolder}}" id="{{id}}" type="{{type}}" />`;
  }
}
