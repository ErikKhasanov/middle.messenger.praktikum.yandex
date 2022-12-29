import Block from "core/Block";

interface ILabelComponent {
  id: string;
  label: string;
  errorText?: string;
}

export class LabelComponent extends Block {
  static componentName = "LabelComponent";

  constructor({ id, label, errorText }: ILabelComponent) {
    super({ id, label, errorText });
  }

  render(): string {
    return `
    <label class="input-controlled_label" for={{id}}>
      {{label}}
      {{#if errorText}}
        <span class="input-controlled_error">({{errorText}})</span>
      {{/if}}
    </label>`;
  }
}
