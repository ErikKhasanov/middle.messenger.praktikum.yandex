import Block from 'core/Block';

import './input.css';

interface IInputProps {
  id: string;
  name: string;
  type?: string;
  label?: string;
  inputValue: string | number;
  placeHolder?: string;
  errorText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
}

export class InputControll extends Block<IInputProps> {
  static componentName = 'InputControll';

  constructor({ onFocus, onBlur, onInput, id, name, type, label, inputValue, placeHolder, errorText }: IInputProps) {
    super({
      id,
      name,
      type,
      label,
      inputValue,
      placeHolder,
      errorText,
      onFocus,
      onBlur,
      onInput,
    });
  }

  render(): string {
    return `
      <div class="input-controlled">
        {{{LabelComponent
          id=id
          label=label
          errorText=errorText
        }}}
        {{{InputComponent
          id=id
          name=name
          type=type
          placeHolder=placeHolder
          inputValue=inputValue
          onInput=onInput
          onFocus=onFocus
          onBlur=onBlur
        }}}
      </div>
    `;
  }
}
