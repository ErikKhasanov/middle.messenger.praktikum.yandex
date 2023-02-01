import Block from 'core/Block';

interface IInputComponent {
  id: string;
  name: string;
  type?: 'text' | 'number' | 'password' | 'email';
  placeHolder?: string;
  inputValue: string | number;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class InputComponent extends Block {
  static componentName = 'InputComponent';

  constructor({ id, name, type, placeHolder, inputValue, onInput, onFocus, onBlur }: IInputComponent) {
    super({
      id,
      name,
      type,
      placeHolder,
      inputValue,
      events: { input: onInput, focus: onFocus, blur: onBlur },
    });
  }

  render(): string {
    return `<input class="input-controlled_input" value="{{inputValue}}" placeholder="{{placeHolder}}" id="{{id}}" name="{{name}}" type="{{type}}" />`;
  }
}
