import Block from 'core/Block';

import './fileForm.css';

interface IFileFormProps {
  label: string;
  id: string;
  name: string;
  onSubmit: () => void;
  events: { [key: string]: () => void };
}

export class FileForm extends Block<Omit<IFileFormProps, 'onSubmit'>> {
  static componentName = 'FileForm';

  constructor({ label, id, name, onSubmit }: Omit<IFileFormProps, 'events'>) {
    super({ label, id, name, events: { submit: onSubmit } });
  }

  render(): string {
    return `<form class="file-form">
    {{label}}: <input id={{id}} type="file" name={{name}} accept="image/*">
    <input type="submit">
  </form> `;
  }
}
