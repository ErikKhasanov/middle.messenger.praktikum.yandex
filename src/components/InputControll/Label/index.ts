import Block from "core/Block";

interface ILabelComponent {
  id?: string;
  label?: string;
}

export class LabelComponent extends Block {
  static componentName = "LabelComponent";

  constructor({ id, label }: ILabelComponent) {
    super({ id, label });
  }

  render(): string {
    return `<label class="input-controlled_label" for={{id}}>{{label}}</label>`;
  }
}
