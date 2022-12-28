import Block from "core/Block";

interface IErrorComponent {
  errorText?: string;
}

export class ErrorComponent extends Block {
  static componentName = "ErrorComponent";

  constructor({ errorText }: IErrorComponent) {
    super({ errorText });
  }

  render(): string {
    return `<span class="input-controlled_error">{{errorText}}</span>`;
  }
}
