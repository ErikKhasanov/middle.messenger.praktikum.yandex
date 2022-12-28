import Block from "core/Block";

import "./input.css";

interface IInput {
  id: string;
  type?: string;
  label?: string;
  inputValue: string | number;
  placeHolder?: string;
  errorText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
}

export class InputControll extends Block {
  constructor({
    onFocus,
    onBlur,
    onInput,
    id,
    type,
    label,
    inputValue,
    placeHolder,
    errorText,
  }: IInput) {
    super({
      id,
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
        }}}
        {{#if errorText}}{{{ErrorComponent ref=errorRef errorText=errorText}}}{{/if}}
        {{{InputComponent
          id=id
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
