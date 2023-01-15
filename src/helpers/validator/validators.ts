interface IValidator {
  value: string;
  errorMessage?: string;
}

interface IMaxLength extends IValidator {
  maxLength: number;
}

interface IMinLength extends IValidator {
  minLength: number;
}

interface IValidatorError {
  error: boolean;
  text?: string;
}

type IValidatorFunc = boolean | IValidatorError;

export const VALIDATORS_MAP = {
  maxLength:
    ({ value, maxLength, errorMessage }: IMaxLength) =>
    (): IValidatorFunc => {
      if (value.length > maxLength) {
        return { error: true, text: errorMessage };
      }
      return true;
    },
  minLength:
    ({ value, minLength, errorMessage }: IMinLength) =>
    () => {
      if (value.length < minLength) {
        return { error: true, text: errorMessage };
      }
      return true;
    },
  required:
    ({ value, errorMessage }: IValidator) =>
    () => {
      if (value.length === 0) {
        return {
          error: true,
          text: errorMessage || 'Поле обязательно',
        };
      }
      return true;
    },
  login:
    ({ value }: IValidator) =>
    () => {
      if (/^[\d]$/gm.test(value)) {
        return {
          error: true,
          text: 'Логин не может состоять только из цифр',
        };
      }
      if (!/^[0-9A-z_-]+$/gm.test(value)) {
        return {
          error: true,
          text: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        };
      }
      return true;
    },
  phone:
    ({ value }: IValidator) =>
    () => {
      if (!/^\+?\d{10,15}$/gm.test(value)) {
        return {
          error: true,
          text: 'Неверный формат номера',
        };
      }
      return true;
    },
  firstName:
    ({ value }: IValidator) =>
    () => {
      if (!/^[A-ZА-Я]{1}[a-zA-Zа-яА-Я-]*$/gm.test(value)) {
        return {
          error: true,
          text: 'Имя пользователя невалидное',
        };
      }
      return true;
    },
  secondName:
    ({ value }: IValidator) =>
    () => {
      if (!/^[A-ZА-Я]{1}[a-zA-Zа-яА-Я-]*$/gm.test(value)) {
        return {
          error: true,
          text: 'Фамилия пользователя невалидное',
        };
      }
      return true;
    },
  email:
    ({ value }: IValidator) =>
    () => {
      if (!/^[0-9A-z]+@[0-9A-z]+\..+$/gm.test(value)) {
        return {
          error: true,
          text: 'email невалидный',
        };
      }
      return true;
    },
  password:
    ({ value }: IValidator) =>
    () => {
      if (!/[A-Z]/.test(value)) {
        return {
          error: true,
          text: 'Пароль должен содержать одну заглавную букву',
        };
      }
      if (!/[0-9]]/.test(value)) {
        return {
          error: true,
          text: 'Пароль должен содержать одну цифру',
        };
      }
      return true;
    },
};

export const concatValidators = validatorsArray => {
  let text = '';
  validatorsArray.some(validator => {
    const result: IValidatorFunc = validator();
    if (typeof result === 'object') {
      text = result.text;
      return true;
    }
    return false;
  });
  return text;
};
