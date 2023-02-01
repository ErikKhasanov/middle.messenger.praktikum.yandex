import Block from 'core/Block';

import './fileForm.css';

interface IFileForm {
  label: string;
  id: string;
  name: string;
  onSubmit: () => void;
}

export class FileForm extends Block {
  static componentName = 'FileForm';

  constructor({ label, id, name, onSubmit }: IFileForm) {
    super({ label, id, name, events: { submit: onSubmit } });
  }

  render(): string {
    return `<form class="file-form">
    {{label}}: <input id={{id}} type="file" name={{name}} accept="image/*">
    <input type="submit">
  </form> `;
  }
}
